<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", function () {
    return \Inertia\Inertia::render("Auth/Login/index");
})->middleware("guest");

Route::prefix("apps")->group(function () {

    Route::group(["middleware" => ["auth"]], function () {

        // dashboard
        Route::get("dashboard", \App\Http\Controllers\Admin\DashboardController::class)->name('apps.dashboard');

        // kabupaten
        Route::resource("/kabupatens", \App\Http\Controllers\Admin\KabupatenController::class, ['as' => 'apps']);

        // kecamatan
        Route::resource("/kecamatans", \App\Http\Controllers\Admin\KecamatanController::class, ['as' => 'apps']);

        // kelurahan
        Route::resource("/kelurahans", \App\Http\Controllers\Admin\KelurahanController::class, ['as' => 'apps']);

        // dusun
        Route::resource("/dusuns", \App\Http\Controllers\Admin\DusunController::class, ['as' => 'apps']);

        // rw
        Route::resource("/rws", \App\Http\Controllers\Admin\RWController::class, ['as' => 'apps']);

        // rt
        Route::resource("/rts", \App\Http\Controllers\Admin\RTController::class, ['as' => 'apps']);
    });
});
