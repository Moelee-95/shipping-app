<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Get company statistics.
     */
    public function getStats(Request $request)
    {
        $company = $request->user()->userable;

        if (!$company) {
            return response()->json(['message' => 'Company profile not found'], 404);
        }

        $totalOrders = $company->orders()->count();
        $pendingOrders = $company->pendingOrders()->count();
        $activeOrders = $company->activeOrders()->count();
        $completedOrders = $company->completedOrders()->count();
        $cancelledOrders = $company->orders()->where('status', 'cancelled')->count();

        return response()->json([
            'total_orders' => $totalOrders,
            'pending_orders' => $pendingOrders,
            'active_orders' => $activeOrders,
            'completed_orders' => $completedOrders,
            'cancelled_orders' => $cancelledOrders,
            'total_revenue' => (float) $company->completedOrders()->sum('price'),
        ]);
    }

    /**
     * Get company orders.
     */
    public function getOrders(Request $request)
    {
        $company = $request->user()->userable;

        if (!$company) {
            return response()->json(['message' => 'Company profile not found'], 404);
        }

        $status = $request->query('status');
        $search = $request->query('search');
        $dateFrom = $request->query('dateFrom');
        $dateTo = $request->query('dateTo');

        $query = $company->orders()->with(['driver.user', 'activities.user']);

        if ($status) {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('tracking_number', 'like', "%{$search}%")
                    ->orWhere('pickup_city', 'like', "%{$search}%")
                    ->orWhere('delivery_city', 'like', "%{$search}%")
                    ->orWhere('delivery_address', 'like', "%{$search}%")
                    ->orWhere('pickup_address', 'like', "%{$search}%")
                    ->orWhere('delivery_contact_name', 'like', "%{$search}%")
                    ->orWhere('package_description', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%")
                    ->orWhereHas('driver.user', function ($driverQuery) use ($search) {
                        $driverQuery->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by date range (created_at)
        if ($dateFrom) {
            $query->whereDate('created_at', '>=', $dateFrom);
        }

        if ($dateTo) {
            $query->whereDate('created_at', '<=', $dateTo);
        }

        $orders = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => OrderResource::collection($orders),
        ]);
    }

    /**
     * Get a single order.
     */
    public function getOrder(Request $request, Order $order)
    {
        $company = $request->user()->userable;

        if (!$company) {
            return response()->json(['message' => 'Company profile not found'], 404);
        }

        // Check if order belongs to company
        if ($order->company_id !== $company->id) {
            return response()->json([
                'message' => 'Unauthorized to view this order',
            ], 403);
        }

        return new OrderResource($order->load(['company', 'driver', 'activities']));
    }

    /**
     * Create a new order.
     */
    public function createOrder(Request $request)
    {
        $company = $request->user()->userable;

        if (!$company) {
            return response()->json(['message' => 'Company profile not found'], 404);
        }

        $validated = $request->validate([
            // Pickup Information
            'pickup_address' => 'required|string',
            'pickup_city' => 'required|string',
            'pickup_state' => 'required|string',
            'pickup_zip' => 'required|string',
            'pickup_contact_name' => 'nullable|string',
            'pickup_contact_phone' => 'nullable|string',

            // Delivery Information
            'delivery_address' => 'required|string',
            'delivery_city' => 'required|string',
            'delivery_state' => 'required|string',
            'delivery_zip' => 'required|string',
            'delivery_contact_name' => 'nullable|string',
            'delivery_contact_phone' => 'nullable|string',

            // Package Information
            'package_type' => 'nullable|string',
            'package_description' => 'nullable|string',
            'package_weight' => 'nullable|numeric',
            'package_dimensions' => 'nullable|string',

            // Pricing
            'price' => 'required|numeric|min:0',
            'driver_earning' => 'nullable|numeric|min:0',

            // Optional
            'deadline' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        // Create the order
        $order = $company->orders()->create($validated);

        // Log activity
        $order->logActivity(
            'created',
            "Order created by {$company->company_name}",
            $request->user()->id
        );

        // Update company stats
        $company->updateStats();

        return response()->json([
            'message' => 'Order created successfully',
            'order' => new OrderResource($order->load('company')),
        ], 201);
    }

    /**
     * Update an order.
     */
    public function updateOrder(Request $request, Order $order)
    {
        $company = $request->user()->userable;

        if (!$company) {
            return response()->json(['message' => 'Company profile not found'], 404);
        }

        // Check if order belongs to company
        if ($order->company_id !== $company->id) {
            return response()->json([
                'message' => 'Unauthorized to update this order',
            ], 403);
        }

        // Only allow updates on pending orders
        if (!$order->isPending()) {
            return response()->json([
                'message' => 'Can only update pending orders',
            ], 422);
        }

        $validated = $request->validate([
            'pickup_address' => 'sometimes|required|string',
            'pickup_city' => 'sometimes|required|string',
            'pickup_state' => 'sometimes|required|string',
            'pickup_zip' => 'sometimes|required|string',
            'pickup_contact_name' => 'nullable|string',
            'pickup_contact_phone' => 'nullable|string',
            'delivery_address' => 'sometimes|required|string',
            'delivery_city' => 'sometimes|required|string',
            'delivery_state' => 'sometimes|required|string',
            'delivery_zip' => 'sometimes|required|string',
            'delivery_contact_name' => 'nullable|string',
            'delivery_contact_phone' => 'nullable|string',
            'package_type' => 'nullable|string',
            'package_description' => 'nullable|string',
            'package_weight' => 'nullable|numeric',
            'package_dimensions' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'driver_earning' => 'nullable|numeric|min:0',
            'deadline' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $order->update($validated);

        $order->logActivity(
            'updated',
            "Order updated by {$company->company_name}",
            $request->user()->id
        );

        return response()->json([
            'message' => 'Order updated successfully',
            'order' => new OrderResource($order->fresh(['company', 'driver'])),
        ]);
    }

    /**
     * Cancel an order.
     */
    public function cancelOrder(Request $request, Order $order)
    {
        $company = $request->user()->userable;

        if (!$company) {
            return response()->json(['message' => 'Company profile not found'], 404);
        }

        // Check if order belongs to company
        if ($order->company_id !== $company->id) {
            return response()->json([
                'message' => 'Unauthorized to cancel this order',
            ], 403);
        }

        // Only allow cancellation on pending or accepted orders
        if (!in_array($order->status, ['pending', 'accepted'])) {
            return response()->json([
                'message' => 'Cannot cancel order in current status',
            ], 422);
        }

        $validated = $request->validate([
            'cancellation_reason' => 'required|string',
        ]);

        $order->cancel($validated['cancellation_reason'], $request->user()->id);

        return response()->json([
            'message' => 'Order cancelled successfully',
            'order' => new OrderResource($order->fresh(['company', 'driver'])),
        ]);
    }

    /**
     * Get company analytics.
     */
    public function getAnalytics(Request $request)
    {
        $company = $request->user()->userable;

        if (!$company) {
            return response()->json(['message' => 'Company profile not found'], 404);
        }

        $days = $request->query('days', 7);
        $dailyOrders = [];

        for ($i = $days - 1; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $count = $company->orders()
                ->whereDate('created_at', $date)
                ->count();

            $dailyOrders[] = [
                'date' => $date,
                'count' => $count,
            ];
        }

        return response()->json([
            'daily_orders' => $dailyOrders,
        ]);
    }

    /**
     * Export orders.
     */
    public function exportOrders(Request $request)
    {
        $company = $request->user()->userable;

        if (!$company) {
            return response()->json(['message' => 'Company profile not found'], 404);
        }

        $format = $request->query('format', 'csv');
        $status = $request->query('status');

        $query = $company->orders()->with(['driver.user']);

        if ($status) {
            $query->where('status', $status);
        }

        $orders = $query->get();

        if ($format === 'csv') {
            $csv = "ID,Tracking Number,Status,Pickup City,Delivery City,Price,Created At\n";

            foreach ($orders as $order) {
                $csv .= sprintf(
                    "%d,%s,%s,%s,%s,%.2f,%s\n",
                    $order->id,
                    $order->tracking_number,
                    $order->status,
                    $order->pickup_city,
                    $order->delivery_city,
                    $order->price,
                    $order->created_at->format('Y-m-d H:i:s')
                );
            }

            return response($csv, 200)
                ->header('Content-Type', 'text/csv')
                ->header('Content-Disposition', 'attachment; filename="orders-' . now()->format('Y-m-d') . '.csv"');
        }

        return response()->json(['message' => 'Invalid format'], 400);
    }
}
