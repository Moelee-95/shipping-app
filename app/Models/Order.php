<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'tracking_number',
        'company_id',
        'driver_id',
        'pickup_branch_id',
        'delivery_branch_id',
        'delivery_contact_name',
        'delivery_contact_phone',
        'package_description',
        'package_weight',
        'price',
        'driver_earning',
        'status',
        'accepted_at',
        'picked_up_at',
        'in_transit_at',
        'delivered_at',
        'cancelled_at',
        'deadline',
        'notes',
        'cancellation_reason',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'driver_earning' => 'decimal:2',
            'package_weight' => 'decimal:2',
            'accepted_at' => 'datetime',
            'picked_up_at' => 'datetime',
            'in_transit_at' => 'datetime',
            'delivered_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'deadline' => 'datetime',
        ];
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            if (!$order->tracking_number) {
                $order->tracking_number = self::generateTrackingNumber();
            }
        });
    }

    /**
     * Generate a unique tracking number.
     */
    public static function generateTrackingNumber(): string
    {
        do {
            $trackingNumber = 'TRK' . strtoupper(Str::random(10));
        } while (self::where('tracking_number', $trackingNumber)->exists());

        return $trackingNumber;
    }

    /**
     * Get the company that owns the order.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the driver assigned to the order.
     */
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    /**
     * Get the pickup branch for this order.
     */
    public function pickupBranch()
    {
        return $this->belongsTo(Branch::class, 'pickup_branch_id');
    }

    /**
     * Get the delivery branch for this order.
     */
    public function deliveryBranch()
    {
        return $this->belongsTo(Branch::class, 'delivery_branch_id');
    }

    /**
     * Get the activities for this order.
     */
    public function activities()
    {
        return $this->hasMany(OrderActivity::class);
    }

    /**
     * Log an activity for this order.
     */
    public function logActivity(string $action, string $description, ?int $userId = null, ?array $metadata = null): void
    {
        $this->activities()->create([
            'user_id' => $userId ?? auth()->id(),
            'action' => $action,
            'description' => $description,
            'metadata' => $metadata,
        ]);
    }

    /**
     * Update the order status and log activity.
     */
    public function updateStatus(string $newStatus, ?int $userId = null): bool
    {
        $oldStatus = $this->status;

        $timestampField = match($newStatus) {
            'accepted' => 'accepted_at',
            'picked_up' => 'picked_up_at',
            'in_transit' => 'in_transit_at',
            'delivered' => 'delivered_at',
            'cancelled' => 'cancelled_at',
            default => null,
        };

        $updates = ['status' => $newStatus];

        if ($timestampField) {
            $updates[$timestampField] = now();
        }

        $this->update($updates);

        $this->logActivity(
            $newStatus,
            "Order status changed from {$oldStatus} to {$newStatus}",
            $userId,
            ['old_status' => $oldStatus, 'new_status' => $newStatus]
        );

        // Update driver stats if order is delivered
        if ($newStatus === 'delivered' && $this->driver) {
            $this->driver->updateStats();
        }

        return true;
    }

    /**
     * Assign a driver to the order.
     */
    public function assignDriver(Driver $driver): bool
    {
        $this->update([
            'driver_id' => $driver->id,
            'status' => 'accepted',
            'accepted_at' => now(),
        ]);

        $this->logActivity(
            'accepted',
            "Order accepted by driver {$driver->user->name}",
            $driver->user->id
        );

        return true;
    }

    /**
     * Cancel the order.
     */
    public function cancel(string $reason, ?int $userId = null): bool
    {
        $this->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancellation_reason' => $reason,
        ]);

        $this->logActivity(
            'cancelled',
            "Order cancelled: {$reason}",
            $userId
        );

        return true;
    }

    /**
     * Scope for available orders (pending, no driver).
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'pending')->whereNull('driver_id');
    }

    /**
     * Scope for orders by status.
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Check if order is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if order is active (not pending, delivered, or cancelled).
     */
    public function isActive(): bool
    {
        return in_array($this->status, ['accepted', 'picked_up', 'in_transit']);
    }

    /**
     * Check if order is completed.
     */
    public function isCompleted(): bool
    {
        return $this->status === 'delivered';
    }

    /**
     * Check if order is cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }
}
