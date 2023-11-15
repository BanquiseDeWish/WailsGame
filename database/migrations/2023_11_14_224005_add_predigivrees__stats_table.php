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
        Schema::create('predigivrees__history', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('streamId');
            $table->integer('win_position');
            $table->integer('most_choice_position');
            $table->longText('map')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('predigivrees__history');
    }
};
