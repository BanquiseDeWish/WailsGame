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
        Schema::create('users__cosmetics', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('cosmetic_id');
            $table->integer('payment_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users__cosmetics');
    }
};
