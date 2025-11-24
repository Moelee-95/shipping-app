<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
protected $fillable = [
    'shipping_company_id',
    'title',
    'description',
    'dimensions',
    'pickup_location',
    'dropoff_city',
    'driver_payout',
    'status',
    'accepted_by_driver_id',
    'accepted_at',
];
}
