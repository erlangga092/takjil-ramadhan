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
        Schema::table('masjid', function (Blueprint $table) {
            $table->dropForeign('masjid_takmir_id_foreign');
            $table->dropColumn('takmir_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('masjid', function (Blueprint $table) {
            //
        });
    }
};
