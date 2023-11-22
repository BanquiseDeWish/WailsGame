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
        Schema::table('penguin_card', function(Blueprint $table) {
            $table->string('background_type')->nullable(true)->change();
            $table->json('background_data')->nullable(true)->change();
            $table->string('slogan')->nullable(true)->change();
            $table->string('penguin_id')->nullable(true)->change();
            $table->string('bubble_color')->nullable(true)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('penguin_card', function(Blueprint $table) {
            $table->string('background_type')->nullable(false)->change();
            $table->json('background_data')->nullable(false)->change();
            $table->string('slogan')->nullable(false)->change();
            $table->string('penguin_id')->nullable(false)->change();
            $table->string('bubble_color')->nullable(false)->change();
        });
    }
};
