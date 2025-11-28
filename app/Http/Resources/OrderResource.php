<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tracking_number' => $this->tracking_number,
            'company_id' => $this->company_id,
            'driver_id' => $this->driver_id,
            'pickup_branch_id' => $this->pickup_branch_id,
            'delivery_branch_id' => $this->delivery_branch_id,

            // Pickup Information (from pickup branch)
            'pickup_address' => $this->pickupBranch?->address,
            'pickup_city' => $this->pickupBranch?->city,
            'pickup_state' => $this->pickupBranch?->state,
            'pickup_zip' => $this->pickupBranch?->zip_code,
            'pickup_contact_name' => $this->pickupBranch?->contact_person,
            'pickup_contact_phone' => $this->pickupBranch?->phone,

            // Delivery Information (from delivery branch + order contact)
            'delivery_address' => $this->deliveryBranch?->address,
            'delivery_city' => $this->deliveryBranch?->city,
            'delivery_state' => $this->deliveryBranch?->state,
            'delivery_zip' => $this->deliveryBranch?->zip_code,
            'delivery_contact_name' => $this->delivery_contact_name,
            'delivery_contact_phone' => $this->delivery_contact_phone,

            // Package Information
            'package_description' => $this->package_description,
            'package_weight' => $this->package_weight ? (float) $this->package_weight : null,
            'weight' => $this->package_weight ? (float) $this->package_weight : null, // alias for frontend

            // Pricing
            'price' => (float) $this->price,
            'driver_earning' => $this->driver_earning ? (float) $this->driver_earning : null,

            // Status and Timeline
            'status' => $this->status,
            'accepted_at' => $this->accepted_at,
            'picked_up_at' => $this->picked_up_at,
            'in_transit_at' => $this->in_transit_at,
            'delivered_at' => $this->delivered_at,
            'cancelled_at' => $this->cancelled_at,
            'deadline' => $this->deadline,
            'pickup_date' => $this->deadline, // alias for frontend

            // Notes
            'notes' => $this->notes,
            'cancellation_reason' => $this->cancellation_reason,

            // Branch Relationships
            'pickup_branch' => $this->when($this->relationLoaded('pickupBranch'), function () {
                return $this->pickupBranch ? [
                    'id' => $this->pickupBranch->id,
                    'name' => $this->pickupBranch->name,
                    'address' => $this->pickupBranch->address,
                    'city' => $this->pickupBranch->city,
                    'state' => $this->pickupBranch->state,
                    'zip_code' => $this->pickupBranch->zip_code,
                    'phone' => $this->pickupBranch->phone,
                    'contact_person' => $this->pickupBranch->contact_person,
                ] : null;
            }),
            'delivery_branch' => $this->when($this->relationLoaded('deliveryBranch'), function () {
                return $this->deliveryBranch ? [
                    'id' => $this->deliveryBranch->id,
                    'name' => $this->deliveryBranch->name,
                    'address' => $this->deliveryBranch->address,
                    'city' => $this->deliveryBranch->city,
                    'state' => $this->deliveryBranch->state,
                    'zip_code' => $this->deliveryBranch->zip_code,
                    'phone' => $this->deliveryBranch->phone,
                    'contact_person' => $this->deliveryBranch->contact_person,
                ] : null;
            }),

            // Company and Driver Relationships
            'company' => $this->when($this->relationLoaded('company'), function () {
                return [
                    'id' => $this->company->id,
                    'name' => $this->company->company_name,
                    'company_name' => $this->company->company_name,
                ];
            }),
            'driver' => $this->when($this->relationLoaded('driver'), function () {
                return $this->driver ? [
                    'id' => $this->driver->id,
                    'name' => $this->driver->user->name ?? null,
                    'phone' => $this->driver->phone,
                    'vehicle_type' => $this->driver->vehicle_type,
                ] : null;
            }),
            'activities' => OrderActivityResource::collection($this->whenLoaded('activities')),

            // Timestamps
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
