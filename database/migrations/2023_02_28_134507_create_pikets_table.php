<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('piket', function (Blueprint $table) {
            $table->id();
            $table->foreignId('masjid_id')->references('id')->on('masjid')->restrictOnDelete();
            $table->foreignId('tahun_ramadhan_id')->references('id')->on('tahun_ramadhan')->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('piket');
    }
};
