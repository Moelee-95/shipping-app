<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'userable_type',
        'userable_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the parent userable model (Driver or Company).
     */
    public function userable()
    {
        return $this->morphTo();
    }

    /**
     * Check if user is a driver.
     */
    public function isDriver(): bool
    {
        return $this->userable_type === Driver::class;
    }

    /**
     * Check if user is a shipping company.
     */
    public function isCompany(): bool
    {
        return $this->userable_type === Company::class;
    }

    /**
     * Get the role attribute based on userable type.
     */
    public function getRoleAttribute(): string
    {
        return match($this->userable_type) {
            Driver::class => 'driver',
            Company::class => 'shipping_company',
            default => 'unknown',
        };
    }
}
