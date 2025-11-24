<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            
            // Foreign key to shipping company (users table)
            $table->unsignedBigInteger('shipping_company_id');
            $table->foreign('shipping_company_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('title');
            $table->text('description');
            $table->text('dimensions');
            $table->text('pickup_location');
            $table->string('dropoff_city');
            $table->decimal('driver_payout', 10, 2);

            $table->enum('status', ['available', 'accepted', 'cancelled'])->default('available');

            // Nullable foreign key to driver who accepted the order
            $table->unsignedBigInteger('accepted_by_driver_id')->nullable();
            $table->foreign('accepted_by_driver_id')->references('id')->on('users')->onDelete('set null');

            $table->timestamp('accepted_at')->nullable();

            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
