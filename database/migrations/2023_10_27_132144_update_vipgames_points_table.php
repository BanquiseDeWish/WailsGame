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
        Schema::table('vipgames_points', function (Blueprint $table) {
            $table->bigInteger('stream_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vipgames_points', function (Blueprint $table) {
            $table->integer('stream_id')->change();
        });
    }
};
