<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes (no authentication required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (authentication required)
Route::middleware(['auth:sanctum'])->group(function () {

    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::patch('/profile', [AuthController::class, 'updateProfile']);
    Route::patch('/password', [AuthController::class, 'updatePassword']);

    // Shared order routes
    Route::get('/orders/{order}', [OrderController::class, 'show']);

    // Driver routes
    Route::prefix('driver')->middleware('driver')->group(function () {
        Route::get('/stats', [DriverController::class, 'getStats']);
        Route::get('/available-orders', [DriverController::class, 'getAvailableOrders']);
        Route::get('/my-orders', [DriverController::class, 'getMyOrders']);
        Route::post('/orders/{order}/accept', [DriverController::class, 'acceptOrder']);
        Route::patch('/orders/{order}/status', [DriverController::class, 'updateOrderStatus']);
    });

    // Company routes
    Route::prefix('company')->middleware('company')->group(function () {
        Route::get('/stats', [CompanyController::class, 'getStats']);
        Route::get('/analytics', [CompanyController::class, 'getAnalytics']);
        Route::get('/orders', [CompanyController::class, 'getOrders']);
        Route::post('/orders', [CompanyController::class, 'createOrder']);
        Route::get('/orders/export', [CompanyController::class, 'exportOrders']);
        Route::get('/orders/{order}', [CompanyController::class, 'getOrder']);
        Route::patch('/orders/{order}', [CompanyController::class, 'updateOrder']);
        Route::delete('/orders/{order}', [CompanyController::class, 'cancelOrder']);
    });
});
