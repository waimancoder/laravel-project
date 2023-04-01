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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('username')->nullable()->unique();
            $table->string('email')->unique();
            $table->string('fullname')->nullable();
            $table->string('phone_no')->nullable();
            $table->boolean('isVerified')->default(false);
            $table->dateTime('birthdate')->nullable();
            $table->string('profile_img')->nullable();
            $table->string('nationality')->nullable();
            $table->string('dialCode')->nullable();
            $table->string('gender')->nullable();
            $table->string('role')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
