<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->string('phone')->nullable();
            $table->string('license_number')->nullable();
            $table->string('vehicle_type')->nullable();
            $table->string('vehicle_plate')->nullable();
            $table->enum('status', ['available', 'busy', 'offline'])->default('available');
            $table->decimal('total_earnings', 10, 2)->default(0);
            $table->integer('completed_orders')->default(0);
            $table->decimal('rating', 3, 2)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
