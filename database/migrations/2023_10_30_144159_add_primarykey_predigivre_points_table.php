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
        Schema::table('predigivrees__points', function (Blueprint $table) {
            $table->dropColumn('id');
            $table->increments('id')->before('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('predigivrees__points', function (Blueprint $table) {
            $table->dropColumn('id');
        });
    }
};
