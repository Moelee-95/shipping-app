<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $product = Product::all();
            return response()->json([
            'success' => true,
            'message' => 'All Product retrieved',
            'data' => $product
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        return Product::create($validated);
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function searchByName($name)
{
    
    $products = Product::whereRaw('name ILIKE ?', ["%{$name}%"])->get();

    if ($products->isEmpty()) {
        return response()->json([
            'success' => false,
            'message' => 'No products found',
            'data' => []
        ], 404);
    }

    return response()->json([
        'success' => true,
        'message' => 'Products retrieved successfully',
        'data' => ['products' => $products]
    ]);
}


    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:products,slug,' . $product->id,
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
        ]);

        $product->update($validated);
         return response()->json(['message' => 'Product created', 'product' => $product], 201);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}
