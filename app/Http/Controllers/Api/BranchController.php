<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->userable_type !== 'App\Models\Company') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $company = $user->userable;

        $query = Branch::where('company_id', $company->id);

        // Apply search filter
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('state', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $branches = $query->orderBy('is_primary', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $branches,
            'total' => $branches->count()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->userable_type !== 'App\Models\Company') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $company = $user->userable;

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|size:2',
            'zip_code' => 'required|string|max:10',
            'phone' => 'required|string|max:20',
            'contact_person' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if this is the first branch - make it primary
        $branchCount = Branch::where('company_id', $company->id)->count();
        $isPrimary = $branchCount === 0;

        $branch = Branch::create([
            'company_id' => $company->id,
            'name' => $request->name,
            'address' => $request->address,
            'city' => $request->city,
            'state' => strtoupper($request->state),
            'zip_code' => $request->zip_code,
            'phone' => $request->phone,
            'contact_person' => $request->contact_person,
            'is_primary' => $isPrimary,
        ]);

        return response()->json([
            'message' => 'Branch created successfully',
            'data' => $branch
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();

        if ($user->userable_type !== 'App\Models\Company') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $company = $user->userable;

        $branch = Branch::where('company_id', $company->id)
            ->where('id', $id)
            ->first();

        if (!$branch) {
            return response()->json(['message' => 'Branch not found'], 404);
        }

        return response()->json([
            'data' => $branch
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();

        if ($user->userable_type !== 'App\Models\Company') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $company = $user->userable;

        $branch = Branch::where('company_id', $company->id)
            ->where('id', $id)
            ->first();

        if (!$branch) {
            return response()->json(['message' => 'Branch not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:255',
            'city' => 'sometimes|required|string|max:100',
            'state' => 'sometimes|required|string|size:2',
            'zip_code' => 'sometimes|required|string|max:10',
            'phone' => 'sometimes|required|string|max:20',
            'contact_person' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only(['name', 'address', 'city', 'state', 'zip_code', 'phone', 'contact_person']);

        if (isset($data['state'])) {
            $data['state'] = strtoupper($data['state']);
        }

        $branch->update($data);

        return response()->json([
            'message' => 'Branch updated successfully',
            'data' => $branch
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        if ($user->userable_type !== 'App\Models\Company') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $company = $user->userable;

        $branch = Branch::where('company_id', $company->id)
            ->where('id', $id)
            ->first();

        if (!$branch) {
            return response()->json(['message' => 'Branch not found'], 404);
        }

        if (!$branch->canDelete()) {
            if ($branch->is_primary) {
                return response()->json([
                    'message' => 'Cannot delete primary branch. Please set another branch as primary first.'
                ], 400);
            }

            return response()->json([
                'message' => 'Company must have at least 2 branches. Cannot delete this branch.'
            ], 400);
        }

        $branch->delete();

        return response()->json([
            'message' => 'Branch deleted successfully'
        ]);
    }

    /**
     * Set a branch as primary.
     */
    public function setPrimary(Request $request, string $id)
    {
        $user = $request->user();

        if ($user->userable_type !== 'App\Models\Company') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $company = $user->userable;

        $branch = Branch::where('company_id', $company->id)
            ->where('id', $id)
            ->first();

        if (!$branch) {
            return response()->json(['message' => 'Branch not found'], 404);
        }

        // Update the branch to be primary (model will handle removing primary from others)
        $branch->update(['is_primary' => true]);

        return response()->json([
            'message' => 'Primary branch updated successfully',
            'data' => $branch
        ]);
    }
}
