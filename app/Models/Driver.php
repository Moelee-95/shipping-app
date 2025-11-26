<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Driver extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'phone',
        'license_number',
        'vehicle_type',
        'vehicle_plate',
        'status',
        'total_earnings',
        'completed_orders',
        'rating',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'total_earnings' => 'decimal:2',
            'rating' => 'decimal:2',
            'completed_orders' => 'integer',
        ];
    }

    /**
     * Get the user that owns the driver profile.
     */
    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }

    /**
     * Get orders assigned to this driver.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get active orders (accepted, picked_up, in_transit).
     */
    public function activeOrders()
    {
        return $this->orders()->whereIn('status', ['accepted', 'picked_up', 'in_transit']);
    }

    /**
     * Get completed orders.
     */
    public function completedOrders()
    {
        return $this->orders()->where('status', 'delivered');
    }

    /**
     * Update driver statistics.
     */
    public function updateStats(): void
    {
        $this->update([
            'completed_orders' => $this->completedOrders()->count(),
            'total_earnings' => $this->completedOrders()->sum('driver_earning'),
        ]);
    }
}
