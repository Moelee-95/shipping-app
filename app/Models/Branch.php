<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Branch extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'company_id',
        'name',
        'address',
        'city',
        'state',
        'zip_code',
        'phone',
        'contact_person',
        'is_primary',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
        ];
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Ensure only one primary branch per company
        static::saving(function ($branch) {
            if ($branch->is_primary && $branch->isDirty('is_primary')) {
                // Remove primary flag from other branches
                static::where('company_id', $branch->company_id)
                    ->where('id', '!=', $branch->id)
                    ->update(['is_primary' => false]);
            }
        });
    }

    /**
     * Get the company that owns the branch.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get orders that start from this branch (pickup).
     */
    public function pickupOrders()
    {
        return $this->hasMany(Order::class, 'pickup_branch_id');
    }

    /**
     * Get orders that end at this branch (delivery).
     */
    public function deliveryOrders()
    {
        return $this->hasMany(Order::class, 'delivery_branch_id');
    }

    /**
     * Scope to get branches for a specific company.
     */
    public function scopeForCompany($query, int $companyId)
    {
        return $query->where('company_id', $companyId);
    }

    /**
     * Scope to get primary branch.
     */
    public function scopePrimary($query)
    {
        return $query->where('is_primary', true);
    }

    /**
     * Check if this branch can be deleted.
     */
    public function canDelete(): bool
    {
        // Cannot delete if it's the primary branch
        if ($this->is_primary) {
            return false;
        }

        // Cannot delete if company would have less than 2 branches
        $branchCount = static::where('company_id', $this->company_id)->count();
        if ($branchCount <= 2) {
            return false;
        }

        return true;
    }
}
