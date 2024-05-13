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
        Schema::table('users__card', function (Blueprint $table) {
            $table->dropColumn('background_type');
            $table->dropColumn('background_data');
            $table->dropColumn('slogan');
            $table->dropColumn('penguin_id');
            $table->dropColumn('bubble_color');
            $table->string('active_cosmetics', 255);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users__card', function (Blueprint $table) {
            $table->string('background_type')->nullable();
            $table->json('background_data')->nullable();
            $table->string('slogan')->nullable();
            $table->string('penguin_id')->nullable();
            $table->string('bubble_color')->nullable();
            $table->dropColumn('active_cosmetics');
        });
    }
};
