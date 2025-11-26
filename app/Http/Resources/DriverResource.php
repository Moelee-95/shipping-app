<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DriverResource extends JsonResource
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
            'phone' => $this->phone,
            'license_number' => $this->license_number,
            'vehicle_type' => $this->vehicle_type,
            'vehicle_plate' => $this->vehicle_plate,
            'status' => $this->status,
            'total_earnings' => (float) $this->total_earnings,
            'completed_orders' => $this->completed_orders,
            'rating' => $this->rating ? (float) $this->rating : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
