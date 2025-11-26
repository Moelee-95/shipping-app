<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Driver;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Drivers
        $driver1 = Driver::create([
            'phone' => '+1-555-0101',
            'license_number' => 'DL12345678',
            'vehicle_type' => 'Van',
            'vehicle_plate' => 'ABC-1234',
            'status' => 'available',
        ]);

        User::create([
            'name' => 'John Driver',
            'email' => 'driver@driver.com',
            'password' => Hash::make('driver'),
            'userable_type' => Driver::class,
            'userable_id' => $driver1->id,
        ]);

        $driver2 = Driver::create([
            'phone' => '+1-555-0102',
            'license_number' => 'DL87654321',
            'vehicle_type' => 'Truck',
            'vehicle_plate' => 'XYZ-5678',
            'status' => 'available',
        ]);

        User::create([
            'name' => 'Jane Smith',
            'email' => 'driver2@example.com',
            'password' => Hash::make('password'),
            'userable_type' => Driver::class,
            'userable_id' => $driver2->id,
        ]);

        // Create Companies
        $company1 = Company::create([
            'company_name' => 'FastShip Logistics',
            'phone' => '+1-555-0201',
            'business_license' => 'BL123456',
            'address' => '123 Business St',
            'city' => 'New York',
            'state' => 'NY',
            'zip_code' => '10001',
        ]);

        User::create([
            'name' => 'FastShip Admin',
            'email' => 'company@company.com',
            'password' => Hash::make('company'),
            'userable_type' => Company::class,
            'userable_id' => $company1->id,
        ]);

        $company2 = Company::create([
            'company_name' => 'QuickDeliver Inc',
            'phone' => '+1-555-0202',
            'business_license' => 'BL789012',
            'address' => '456 Commerce Ave',
            'city' => 'Los Angeles',
            'state' => 'CA',
            'zip_code' => '90001',
        ]);

        User::create([
            'name' => 'QuickDeliver Admin',
            'email' => 'company2@example.com',
            'password' => Hash::make('password'),
            'userable_type' => Company::class,
            'userable_id' => $company2->id,
        ]);

        // Create Sample Orders

        // Pending order (available for drivers)
        $order1 = Order::create([
            'company_id' => $company1->id,
            'pickup_address' => '100 Warehouse Rd',
            'pickup_city' => 'New York',
            'pickup_state' => 'NY',
            'pickup_zip' => '10002',
            'pickup_contact_name' => 'Bob Manager',
            'pickup_contact_phone' => '+1-555-1001',
            'delivery_address' => '500 Retail St',
            'delivery_city' => 'Boston',
            'delivery_state' => 'MA',
            'delivery_zip' => '02101',
            'delivery_contact_name' => 'Alice Store',
            'delivery_contact_phone' => '+1-555-2001',
            'package_type' => 'Electronics',
            'package_description' => '5 boxes of electronics',
            'package_weight' => 50.5,
            'package_dimensions' => '24x18x12',
            'price' => 250.00,
            'driver_earning' => 100.00,
            'status' => 'pending',
            'deadline' => now()->addDays(3),
            'notes' => 'Handle with care - fragile items',
        ]);

        $order1->logActivity('created', 'Order created by FastShip Logistics');

        // Accepted order (driver assigned)
        $order2 = Order::create([
            'company_id' => $company1->id,
            'driver_id' => $driver1->id,
            'pickup_address' => '200 Factory Lane',
            'pickup_city' => 'New York',
            'pickup_state' => 'NY',
            'pickup_zip' => '10003',
            'pickup_contact_name' => 'Charlie Supplier',
            'pickup_contact_phone' => '+1-555-1002',
            'delivery_address' => '600 Main St',
            'delivery_city' => 'Philadelphia',
            'delivery_state' => 'PA',
            'delivery_zip' => '19101',
            'delivery_contact_name' => 'Dave Customer',
            'delivery_contact_phone' => '+1-555-2002',
            'package_type' => 'Furniture',
            'package_description' => 'Office desk and chairs',
            'package_weight' => 150.0,
            'package_dimensions' => '72x36x30',
            'price' => 400.00,
            'driver_earning' => 150.00,
            'status' => 'accepted',
            'accepted_at' => now()->subHours(2),
            'deadline' => now()->addDays(2),
        ]);

        $order2->logActivity('created', 'Order created by FastShip Logistics');
        $order2->logActivity('accepted', 'Order accepted by John Driver');

        // In transit order
        $order3 = Order::create([
            'company_id' => $company2->id,
            'driver_id' => $driver2->id,
            'pickup_address' => '300 Industrial Park',
            'pickup_city' => 'Los Angeles',
            'pickup_state' => 'CA',
            'pickup_zip' => '90002',
            'pickup_contact_name' => 'Eve Warehouse',
            'pickup_contact_phone' => '+1-555-1003',
            'delivery_address' => '700 Broadway',
            'delivery_city' => 'San Francisco',
            'delivery_state' => 'CA',
            'delivery_zip' => '94102',
            'delivery_contact_name' => 'Frank Buyer',
            'delivery_contact_phone' => '+1-555-2003',
            'package_type' => 'Documents',
            'package_description' => 'Legal documents - urgent',
            'package_weight' => 5.0,
            'package_dimensions' => '12x9x2',
            'price' => 150.00,
            'driver_earning' => 75.00,
            'status' => 'in_transit',
            'accepted_at' => now()->subDays(1),
            'picked_up_at' => now()->subHours(8),
            'in_transit_at' => now()->subHours(4),
            'deadline' => now()->addDay(),
        ]);

        $order3->logActivity('created', 'Order created by QuickDeliver Inc');
        $order3->logActivity('accepted', 'Order accepted by Jane Smith');
        $order3->logActivity('picked_up', 'Package picked up from warehouse');
        $order3->logActivity('in_transit', 'Package is in transit to San Francisco');

        // Delivered order
        $order4 = Order::create([
            'company_id' => $company1->id,
            'driver_id' => $driver1->id,
            'pickup_address' => '400 Supply Center',
            'pickup_city' => 'New York',
            'pickup_state' => 'NY',
            'pickup_zip' => '10004',
            'pickup_contact_name' => 'Grace Sender',
            'pickup_contact_phone' => '+1-555-1004',
            'delivery_address' => '800 Commerce Blvd',
            'delivery_city' => 'Newark',
            'delivery_state' => 'NJ',
            'delivery_zip' => '07102',
            'delivery_contact_name' => 'Henry Receiver',
            'delivery_contact_phone' => '+1-555-2004',
            'package_type' => 'Clothing',
            'package_description' => 'Fashion merchandise',
            'package_weight' => 25.0,
            'package_dimensions' => '36x24x18',
            'price' => 200.00,
            'driver_earning' => 80.00,
            'status' => 'delivered',
            'accepted_at' => now()->subDays(3),
            'picked_up_at' => now()->subDays(3)->addHours(2),
            'in_transit_at' => now()->subDays(3)->addHours(4),
            'delivered_at' => now()->subDays(2),
            'deadline' => now()->subDay(),
        ]);

        $order4->logActivity('created', 'Order created by FastShip Logistics');
        $order4->logActivity('accepted', 'Order accepted by John Driver');
        $order4->logActivity('picked_up', 'Package picked up');
        $order4->logActivity('in_transit', 'Package in transit');
        $order4->logActivity('delivered', 'Package successfully delivered');

        // Update driver stats
        $driver1->updateStats();
        $driver2->updateStats();

        // Update company stats
        $company1->updateStats();
        $company2->updateStats();

        $this->command->info('Database seeded successfully!');
        $this->command->info('Test Accounts:');
        $this->command->info('Driver: driver@driver.com / driver');
        $this->command->info('Company: company@company.com / company');
    }
}
