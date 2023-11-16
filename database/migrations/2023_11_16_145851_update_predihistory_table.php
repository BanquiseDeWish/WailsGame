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
        Schema::table('predigivrees__history', function(Blueprint $table) {
            $table->string('most_choice_position')->nullable(true)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('predigivrees__history', function(Blueprint $table) {
            $table->integer('most_choice_position')->change();
        });
    }
};
