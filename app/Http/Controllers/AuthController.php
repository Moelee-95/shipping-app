<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
//--------register----------
public function register()
{
    $fields = request()->validate([
        'name' => 'required|string',
        'email' => 'required|string|unique:users,email',
        'password' => 'required|string|confirmed',
        'role' => 'required|in:driver,shipping_company' 
    ]);

    $user = User::create([
        'name' => $fields['name'],
        'email' => $fields['email'],
        'password' => bcrypt($fields['password']),
        'role' => $fields['role'], 
    ]);

    $token = $user->createToken('myapptoken')->plainTextToken;

    $response = [
        'user' => $user,
        'token' => $token
    ];

    return response($response, 201);
}


    //--------login----------
   public function login(Request $request)
{
    $fields = $request->validate([
        'email' => 'required|string',
        'password' => 'required|string'
    ]);

    $user = User::where('email', $fields['email'])->first();

    if (!$user || !Hash::check($fields['password'], $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid username or password',
            'data' => []
        ], 401);
    }

    $token = $user->createToken('myapptoken')->plainTextToken;

    return response()->json([
        'success' => true,
        'message' => 'Login successful',
        'data' => [
            'user' => $user,
            'token' => $token
        ]
    ], 200);
}


    //--------logout----------
    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        
        return [
            'message' => 'Logged out'
        ];
    }


}
