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
        Schema::table('cosmetics', function (Blueprint $table) {
            $table->integer('free')->default(0);
            $table->integer('rarity')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cosmetics', function (Blueprint $table) {
            $table->dropColumn('free');
            $table->dropColumn('rarity');
        });
    }
};
