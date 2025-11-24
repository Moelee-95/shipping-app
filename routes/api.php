<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;

// ----------- Public routes -----------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ----------- Authenticated routes ------------------
Route::middleware('auth:sanctum')->group(function () {

    
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('customers', CustomerController::class);

    Route::apiResource('products', ProductController::class);
    Route::get('products/search/{name}', [ProductController::class, 'searchByName']);

    // ----------------- Shipping company routes ----------------
    Route::prefix('shipping')->middleware(\App\Http\Middleware\RoleMiddleware::class . ':shipping_company')->group(function () {
        Route::apiResource('orders', OrderController::class);
    });

    // ------------------------------- Driver routes ----------------
    Route::prefix('driver')->middleware(\App\Http\Middleware\RoleMiddleware::class . ':driver')->group(function () {
        Route::get('available-orders', [OrderController::class, 'available']);   
        Route::get('orders/{id}', [OrderController::class, 'show']);             
        Route::post('orders/{id}/accept', [OrderController::class, 'accept']);   
        Route::post('orders/{id}/cancel', [OrderController::class, 'cancel']);   
        Route::get('my-orders', [OrderController::class, 'myOrders']);           
    });
});
