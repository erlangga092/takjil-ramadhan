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
        Schema::create('takjil_group', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tanggal_ramadhan_id')->references('id')->on('tanggal_ramadhan')->restrictOnDelete();
            $table->foreignId('warga_id')->references('id')->on('warga')->restrictOnDelete();
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
        Schema::dropIfExists('takjil_group');
    }
};
