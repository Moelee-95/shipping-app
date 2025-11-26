<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Get order by ID.
     */
    public function show(Request $request, Order $order)
    {
        $user = $request->user();
        $userable = $user->userable;

        // Check authorization
        if ($user->isDriver() && $order->driver_id !== $userable->id) {
            return response()->json([
                'message' => 'Unauthorized to view this order',
            ], 403);
        }

        if ($user->isCompany() && $order->company_id !== $userable->id) {
            return response()->json([
                'message' => 'Unauthorized to view this order',
            ], 403);
        }

        return new OrderResource($order->load(['company', 'driver', 'activities']));
    }
}
