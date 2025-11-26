<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Company;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:driver,shipping_company',

            // Driver specific fields
            'phone' => 'required_if:role,driver|nullable|string',
            'license_number' => 'nullable|string',
            'vehicle_type' => 'nullable|string',
            'vehicle_plate' => 'nullable|string',

            // Company specific fields
            'company_name' => 'required_if:role,shipping_company|nullable|string',
            'business_license' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zip_code' => 'nullable|string',
        ]);

        // Create role-specific profile
        if ($validated['role'] === 'driver') {
            $profile = Driver::create([
                'phone' => $validated['phone'] ?? null,
                'license_number' => $validated['license_number'] ?? null,
                'vehicle_type' => $validated['vehicle_type'] ?? null,
                'vehicle_plate' => $validated['vehicle_plate'] ?? null,
            ]);
        } else {
            $profile = Company::create([
                'company_name' => $validated['company_name'],
                'phone' => $validated['phone'] ?? null,
                'business_license' => $validated['business_license'] ?? null,
                'address' => $validated['address'] ?? null,
                'city' => $validated['city'] ?? null,
                'state' => $validated['state'] ?? null,
                'zip_code' => $validated['zip_code'] ?? null,
            ]);
        }

        // Create user with polymorphic relation
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'userable_type' => get_class($profile),
            'userable_id' => $profile->id,
        ]);

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user->load('userable')),
            'token' => $token,
        ], 201);
    }

    /**
     * Login user and create token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Delete old tokens
        $user->tokens()->delete();

        // Create new token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user->load('userable')),
            'token' => $token,
        ]);
    }

    /**
     * Logout user (Revoke token).
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Get authenticated user.
     */
    public function user(Request $request)
    {
        return new UserResource($request->user()->load('userable'));
    }

    /**
     * Update user profile.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string',
            'company_name' => 'nullable|string',
            'license_number' => 'nullable|string',
            'vehicle_type' => 'nullable|string',
            'vehicle_plate' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zip_code' => 'nullable|string',
        ]);

        // Update user name
        $user->update([
            'name' => $validated['name'],
        ]);

        // Update role-specific profile
        if ($user->userable) {
            $profileData = [];

            if ($user->userable instanceof Driver) {
                $profileData = [
                    'phone' => $validated['phone'] ?? null,
                    'license_number' => $validated['license_number'] ?? null,
                    'vehicle_type' => $validated['vehicle_type'] ?? null,
                    'vehicle_plate' => $validated['vehicle_plate'] ?? null,
                ];
            } elseif ($user->userable instanceof Company) {
                $profileData = [
                    'company_name' => $validated['company_name'] ?? null,
                    'phone' => $validated['phone'] ?? null,
                    'address' => $validated['address'] ?? null,
                    'city' => $validated['city'] ?? null,
                    'state' => $validated['state'] ?? null,
                    'zip_code' => $validated['zip_code'] ?? null,
                ];
            }

            $user->userable->update($profileData);
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => new UserResource($user->fresh('userable')),
        ]);
    }

    /**
     * Update user password.
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        // Check if current password is correct
        if (!Hash::check($validated['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        // Update password
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'Password updated successfully',
        ]);
    }
}
