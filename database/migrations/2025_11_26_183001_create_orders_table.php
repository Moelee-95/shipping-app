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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_number')->unique();

            // Company relationship
            $table->foreignId('company_id')->constrained()->onDelete('cascade');

            // Driver relationship (nullable until driver accepts)
            $table->foreignId('driver_id')->nullable()->constrained()->onDelete('set null');

            // Branch relationships (pickup and delivery branches)
            $table->foreignId('pickup_branch_id')->nullable()->constrained('branches')->onDelete('set null');
            $table->foreignId('delivery_branch_id')->nullable()->constrained('branches')->onDelete('set null');

            // Recipient/Delivery Contact Information (for person receiving at delivery branch)
            $table->string('delivery_contact_name')->nullable();
            $table->string('delivery_contact_phone')->nullable();

            // Package Information
            $table->text('package_description')->nullable();
            $table->decimal('package_weight', 10, 2)->nullable();
            $table->string('package_dimensions')->nullable();

            // Pricing
            $table->decimal('price', 10, 2);
            $table->decimal('driver_earning', 10, 2)->nullable();

            // Status and Timeline
            $table->enum('status', ['pending', 'accepted', 'picked_up', 'in_transit', 'delivered', 'cancelled'])->default('pending');
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('picked_up_at')->nullable();
            $table->timestamp('in_transit_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();

            // Deadline
            $table->timestamp('deadline')->nullable();

            // Notes
            $table->text('notes')->nullable();
            $table->text('cancellation_reason')->nullable();

            $table->timestamps();
            $table->softDeletes();

            // Indexes for better query performance
            $table->index('status');
            $table->index('tracking_number');
            $table->index(['company_id', 'status']);
            $table->index(['driver_id', 'status']);
            $table->index('pickup_branch_id');
            $table->index('delivery_branch_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
