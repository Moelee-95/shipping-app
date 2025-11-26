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

            // Pickup Information
            'pickup_address' => $this->pickup_address,
            'pickup_city' => $this->pickup_city,
            'pickup_state' => $this->pickup_state,
            'pickup_zip' => $this->pickup_zip,
            'pickup_contact_name' => $this->pickup_contact_name,
            'pickup_contact_phone' => $this->pickup_contact_phone,

            // Delivery Information
            'delivery_address' => $this->delivery_address,
            'delivery_city' => $this->delivery_city,
            'delivery_state' => $this->delivery_state,
            'delivery_zip' => $this->delivery_zip,
            'delivery_contact_name' => $this->delivery_contact_name,
            'delivery_contact_phone' => $this->delivery_contact_phone,

            // Package Information
            'package_type' => $this->package_type,
            'package_description' => $this->package_description,
            'package_weight' => $this->package_weight ? (float) $this->package_weight : null,
            'package_dimensions' => $this->package_dimensions,

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

            // Notes
            'notes' => $this->notes,
            'cancellation_reason' => $this->cancellation_reason,

            // Relationships
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
