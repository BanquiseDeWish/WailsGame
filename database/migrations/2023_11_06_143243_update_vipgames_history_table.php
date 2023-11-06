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
        Schema::table('vipgames_history', function (Blueprint $table) {
            $table->string('bonus_tickets')->after('winning_ticket');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vipgames_history', function (Blueprint $table) {
            $table->dropColumn('bonus_tickets');
        });
    }
};
