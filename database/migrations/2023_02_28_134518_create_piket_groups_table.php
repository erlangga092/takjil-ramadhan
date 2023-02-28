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
        Schema::create('piket_group', function (Blueprint $table) {
            $table->id();
            $table->foreignId('piket_id')->references('id')->on('piket')->restrictOnDelete();
            $table->foreignId('tanggal_piket_id')->references('id')->on('tanggal_piket')->restrictOnDelete();
            $table->foreignId('petugas_id')->references('id')->on('petugas')->restrictOnDelete();
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
        Schema::dropIfExists('piket_group');
    }
};
