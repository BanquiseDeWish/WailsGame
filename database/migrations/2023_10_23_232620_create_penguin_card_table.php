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
        Schema::create('penguin_card', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('background_type');
            $table->json('background_data');
            $table->string('slogan');
            $table->string('penguin_id');
            $table->string('bubble_color');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penguin_card');
    }
};
