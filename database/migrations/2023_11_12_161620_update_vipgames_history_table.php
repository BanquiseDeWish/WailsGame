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
        Schema::table('stream', function (Blueprint $table) {
            $table->string('bonus_tickets')->after('winning_ticket')->default('0;0;0;0;0')->change();
            $table->bigInteger('stream_id')->after('number_of_tickets')->default(-1)->change();
            $table->json('stats')->after('stream_id')->default(("{}"))->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stream', function (Blueprint $table) {
            $table->string('bonus_tickets')->after('winning_ticket')->default('')->change();
            $table->bigInteger('stream_id')->after('number_of_tickets')->change();
            $table->json('stats')->after('stream_id')->default('')->change();
        });
    }
};
