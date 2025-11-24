<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    public function index()
    {
        $customers = Customer::all();
        return response()->json([
            'success' => true,
            'message' => 'All customers retrieved',
            'data' => $customers
        ]);
    }


    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $customer = Customer::create($fields);

        return response()->json([
            'success' => true,
            'message' => 'Customer created successfully',
            'data' => $customer
        ], 201);
    }


    public function show(Customer $customer)
    {
        return response()->json([
            'success' => true,
            'message' => 'Customer retrieved',
            'data' => $customer
        ]);
    }

 
    public function update(Request $request, Customer $customer)
    {
        $fields = $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:customers,email,' . $customer->id,
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $customer->update($fields);

        return response()->json([
            'success' => true,
            'message' => 'Customer updated successfully',
            'data' => $customer
        ]);
    }

  
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Customer deleted successfully',
            'data' => []
        ]);
    }
}

