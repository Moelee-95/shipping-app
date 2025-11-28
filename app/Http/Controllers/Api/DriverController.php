<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    /**
     * Get driver statistics.
     */
    public function getStats(Request $request)
    {
        $driver = $request->user()->userable;

        if (!$driver) {
            return response()->json(['message' => 'Driver profile not found'], 404);
        }

        $totalOrders = $driver->orders()->count();
        $completedOrders = $driver->completedOrders()->count();
        $activeOrders = $driver->activeOrders()->count();
        $totalEarnings = $driver->completedOrders()->sum('driver_earning');

        return response()->json([
            'total_orders' => $totalOrders,
            'completed_orders' => $completedOrders,
            'active_orders' => $activeOrders,
            'pending_orders' => $driver->orders()->where('status', 'accepted')->count(),
            'total_earnings' => (float) $totalEarnings,
            'rating' => $driver->rating ? (float) $driver->rating : null,
        ]);
    }

    /**
     * Get available orders for drivers to accept.
     */
    public function getAvailableOrders(Request $request)
    {
        $search = $request->query('search');
        $dateFrom = $request->query('dateFrom');
        $dateTo = $request->query('dateTo');
        $state = $request->query('state');

        $query = Order::available()->with(['company', 'driver.user', 'pickupBranch', 'deliveryBranch']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('tracking_number', 'like', "%{$search}%")
                    ->orWhere('delivery_contact_name', 'like', "%{$search}%")
                    ->orWhere('package_description', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%")
                    ->orWhereHas('pickupBranch', function ($branchQuery) use ($search) {
                        $branchQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('city', 'like', "%{$search}%")
                            ->orWhere('address', 'like', "%{$search}%");
                    })
                    ->orWhereHas('deliveryBranch', function ($branchQuery) use ($search) {
                        $branchQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('city', 'like', "%{$search}%")
                            ->orWhere('address', 'like', "%{$search}%");
                    })
                    ->orWhereHas('company', function ($companyQuery) use ($search) {
                        $companyQuery->where('company_name', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by state (pickup or delivery branch)
        if ($state) {
            $query->where(function ($q) use ($state) {
                $q->whereHas('pickupBranch', function ($branchQuery) use ($state) {
                    $branchQuery->where('state', $state);
                })
                ->orWhereHas('deliveryBranch', function ($branchQuery) use ($state) {
                    $branchQuery->where('state', $state);
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
     * Get driver's orders.
     */
    public function getMyOrders(Request $request)
    {
        $driver = $request->user()->userable;

        if (!$driver) {
            return response()->json(['message' => 'Driver profile not found'], 404);
        }

        $status = $request->query('status');
        $search = $request->query('search');
        $dateFrom = $request->query('dateFrom');
        $dateTo = $request->query('dateTo');
        $state = $request->query('state');

        $query = $driver->orders()->with(['company', 'driver.user', 'activities.user', 'pickupBranch', 'deliveryBranch']);

        if ($status) {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('tracking_number', 'like', "%{$search}%")
                    ->orWhere('delivery_contact_name', 'like', "%{$search}%")
                    ->orWhere('package_description', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%")
                    ->orWhereHas('pickupBranch', function ($branchQuery) use ($search) {
                        $branchQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('city', 'like', "%{$search}%")
                            ->orWhere('address', 'like', "%{$search}%");
                    })
                    ->orWhereHas('deliveryBranch', function ($branchQuery) use ($search) {
                        $branchQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('city', 'like', "%{$search}%")
                            ->orWhere('address', 'like', "%{$search}%");
                    })
                    ->orWhereHas('company', function ($companyQuery) use ($search) {
                        $companyQuery->where('company_name', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by state (pickup or delivery branch)
        if ($state) {
            $query->where(function ($q) use ($state) {
                $q->whereHas('pickupBranch', function ($branchQuery) use ($state) {
                    $branchQuery->where('state', $state);
                })
                ->orWhereHas('deliveryBranch', function ($branchQuery) use ($state) {
                    $branchQuery->where('state', $state);
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
     * Accept an order.
     */
    public function acceptOrder(Request $request, Order $order)
    {
        $driver = $request->user()->userable;

        if (!$driver) {
            return response()->json(['message' => 'Driver profile not found'], 404);
        }

        // Check if order is available
        if (!$order->isPending() || $order->driver_id) {
            return response()->json([
                'message' => 'This order is no longer available',
            ], 422);
        }

        // Assign driver to order
        $order->assignDriver($driver);

        return response()->json([
            'message' => 'Order accepted successfully',
            'data' => new OrderResource($order->load(['company', 'driver', 'pickupBranch', 'deliveryBranch'])),
        ]);
    }

    /**
     * Update order status.
     */
    public function updateOrderStatus(Request $request, Order $order)
    {
        $driver = $request->user()->userable;

        if (!$driver) {
            return response()->json(['message' => 'Driver profile not found'], 404);
        }

        // Check if driver owns this order
        if ($order->driver_id !== $driver->id) {
            return response()->json([
                'message' => 'Unauthorized to update this order',
            ], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:picked_up,in_transit,delivered',
        ]);

        // Validate status progression
        $currentStatus = $order->status;
        $newStatus = $validated['status'];

        $allowedTransitions = [
            'accepted' => ['picked_up'],
            'picked_up' => ['in_transit'],
            'in_transit' => ['delivered'],
        ];

        if (!isset($allowedTransitions[$currentStatus]) ||
            !in_array($newStatus, $allowedTransitions[$currentStatus])) {
            return response()->json([
                'message' => "Cannot change status from {$currentStatus} to {$newStatus}",
            ], 422);
        }

        $order->updateStatus($newStatus, $request->user()->id);

        return response()->json([
            'message' => 'Order status updated successfully',
            'data' => new OrderResource($order->fresh(['company', 'driver', 'activities', 'pickupBranch', 'deliveryBranch'])),
        ]);
    }
}
