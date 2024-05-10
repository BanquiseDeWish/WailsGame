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
        Schema::rename('penguin_card', 'users__card');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('users__card', 'penguin_card');
    }
};
