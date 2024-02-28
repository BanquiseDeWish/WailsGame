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
            $table->dropColumn('bonus_tickets');
            $table->dropColumn('winning_ticket');
            $table->dropColumn('number_of_tickets');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vipgames_history', function (Blueprint $table) {
            $table->integer('winning_ticket')->default(-1);
            $table->string('bonus_tickets')->default('0;0;0;0;0');
            $table->integer('number_of_tickets')->default(100);
        });
    }
};
