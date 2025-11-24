<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // ---------------- Shipping Company Methods ----------------

public function index()
{
    $orders = Order::where('shipping_company_id', auth()->id())->get();

    if ($orders->isEmpty()) {
        return response()->json([
            'success' => true,
            'message' => 'No orders found',
            'data' => ['orders' => []]
        ]);
    }

    return response()->json([
        'success' => true,
        'message' => 'Orders retrieved successfully',
        'data' => ['orders' => $orders]
    ]);
}


    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'dimensions' => 'required|string',
        'pickup_location' => 'required|string',
        'dropoff_city' => 'required|string|max:255',
        'driver_payout' => 'required|numeric|min:0',
    ]);

    $validated['shipping_company_id'] = auth()->id();   // <---- FIXED
    $validated['status'] = 'available';
    $validated['accepted_by_driver_id'] = null;
    $validated['accepted_at'] = null;

    $order = Order::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Order created successfully',
        'data' => ['order' => $order]
    ], 201);
}



public function show($id)
{
    $user = auth()->user();

    
    $orderQuery = Order::where('id', $id);

    if ($user->role === 'shipping_company') {
        $orderQuery->where('shipping_company_id', $user->id);
    } elseif ($user->role === 'driver') {
        $orderQuery->where('accepted_by_driver_id', $user->id);
    }

    $order = $orderQuery->first();

    if (!$order) {
        return response()->json([
            'success' => false,
            'message' => 'Order not found',
            'data' => []
        ], 404);
    }

    return response()->json([
        'success' => true,
        'message' => 'Order retrieved successfully',
        'data' => ['order' => $order]
    ]);
}


    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        if ($order->shipping_company_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not allowed to update this order',
                'data' => new \stdClass()
            ], 403);
        }

        if ($order->status === 'accepted') {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be updated because it has been accepted by a driver',
                'data' => new \stdClass()
            ], 400);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'dimensions' => 'sometimes|string',
            'pickup_location' => 'sometimes|string',
            'dropoff_city' => 'sometimes|string|max:255',
            'driver_payout' => 'sometimes|numeric|min:0',
        ]);

        $order->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Order updated successfully',
            'data' => ['order' => $order]
        ]);
    }


    public function destroy($id)
    {
        $order = Order::findOrFail($id);

        if ($order->shipping_company_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not allowed to delete this order',
                'data' => new \stdClass()
            ], 403);
        }

        if ($order->status === 'accepted') {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be deleted because it has been accepted by a driver',
                'data' => new \stdClass()
            ], 400);
        }

        $order->delete();

        return response()->json([
            'success' => true,
            'message' => 'Order deleted successfully',
            'data' => new \stdClass()
        ]);
    }

    // ---------------- Driver Methods ----------------

    public function available()
    {
        $orders = Order::where('status', 'available')->get();

        return response()->json([
            'success' => true,
            'message' => 'Available orders retrieved successfully',
            'data' => ['orders' => $orders]
        ]);
    }

    public function accept($id)
    {
        $order = Order::findOrFail($id);

        if ($order->status !== 'available') {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be accepted',
                'data' => new \stdClass()
            ], 400);
        }

        $order->update([
            'status' => 'accepted',
            'accepted_by_driver_id' => auth()->id(),
            'accepted_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order accepted successfully',
            'data' => ['order' => $order]
        ]);
    }

    public function cancel($id)
    {
        $order = Order::where('accepted_by_driver_id', auth()->id())->findOrFail($id);

        if ($order->status !== 'accepted') {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be canceled',
                'data' => new \stdClass()
            ], 400);
        }

        $order->update([
            'status' => 'available',
            'accepted_by_driver_id' => null,
            'accepted_at' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order canceled successfully',
            'data' => ['order' => $order]
        ]);
    }

    public function myOrders()
    {
        $orders = Order::where('accepted_by_driver_id', auth()->id())->get();

        return response()->json([
            'success' => true,
            'message' => 'Driver orders retrieved successfully',
            'data' => ['orders' => $orders]
        ]);
    }
}
