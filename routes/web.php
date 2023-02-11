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
    });
});
