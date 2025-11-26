<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'email_verified_at' => $this->email_verified_at,
            'userable_type' => $this->userable_type,
            'userable_id' => $this->userable_id,
            'userable' => $this->when(
                $this->relationLoaded('userable'),
                function () {
                    return $this->userable_type === 'App\Models\Driver'
                        ? new DriverResource($this->userable)
                        : new CompanyResource($this->userable);
                }
            ),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
