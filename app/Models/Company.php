<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'company_name',
        'phone',
        'business_license',
        'address',
        'city',
        'state',
        'zip_code',
        'total_orders',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'total_orders' => 'integer',
        ];
    }

    /**
     * Get the user that owns the company profile.
     */
    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }

    /**
     * Get all branches of this company.
     */
    public function branches()
    {
        return $this->hasMany(Branch::class);
    }

    /**
     * Get the primary branch of this company.
     */
    public function primaryBranch()
    {
        return $this->hasOne(Branch::class)->where('is_primary', true);
    }

    /**
     * Get all orders created by this company.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get pending orders.
     */
    public function pendingOrders()
    {
        return $this->orders()->where('status', 'pending');
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
     * Update company statistics.
     */
    public function updateStats(): void
    {
        $this->update([
            'total_orders' => $this->orders()->count(),
        ]);
    }
}
