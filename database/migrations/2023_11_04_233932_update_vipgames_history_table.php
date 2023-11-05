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
            $table->bigInteger('stream_id')->after('number_of_tickets');
            $table->json('stats')->after('stream_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vipgames_history', function (Blueprint $table) {
            $table->dropColumn('stream_id');
            $table->dropColumn('stats'); 
        });
    }
};
