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

        // warga
        Route::get("/wargas/import", [\App\Http\Controllers\Admin\WargaController::class, "import"])->name('apps.wargas.import');

        Route::post("/wargas/import/store", [\App\Http\Controllers\Admin\WargaController::class, "storeImport"])->name('apps.wargas.storeImport');

        Route::resource("/wargas", \App\Http\Controllers\Admin\WargaController::class, ['as' => 'apps']);

        // masjid
        Route::resource("/masjids", \App\Http\Controllers\Admin\MasjidController::class, ['as' => 'apps']);

        // tahun-ramadhan
        Route::resource("/tahun-ramadhans", \App\Http\Controllers\Admin\TahunRamadhanController::class, ['as' => 'apps']);

        // takjil
        Route::delete("/takjils/{takjil}/tanggal-ramadhans/{tanggalRamadhan}/destroy", [\App\Http\Controllers\Admin\TakjilController::class, 'destroyTanggalRamadhan'])->name('apps.takjils.destroyTanggalRamadhan');

        Route::get("/takjils/{takjil}/tanggal-ramadhans/create", [\App\Http\Controllers\Admin\TakjilController::class, 'createTanggalRamadhan'])->name('apps.takjils.createTanggalRamadhan');

        Route::post("/takjils/{takjil}/tanggal-ramadhans/store", [\App\Http\Controllers\Admin\TakjilController::class, 'storeTanggalRamadhan'])->name('apps.takjils.storeTanggalRamadhan');

        Route::resource("/takjils", \App\Http\Controllers\Admin\TakjilController::class, ['as' => 'apps']);

        Route::get("/takjils/{takjil}/tanggal-ramadhans/{tanggalRamadhan}/create", [\App\Http\Controllers\Admin\TakjilController::class, 'createEnrolleWarga'])->name('apps.takjils.ranggal-ramadhans.createEnrolleWarga');

        Route::post("/takjils/{takjil}/tanggal-ramadhans/{tanggalRamadhan}/store", [\App\Http\Controllers\Admin\TakjilController::class, 'storeEnrolleWarga'])->name('apps.takjils.ranggal-ramadhans.storeEnrolleWarga');

        Route::get("/takjils/{takjil}/tanggal-ramadhans/{tanggal_ramadhan}", [\App\Http\Controllers\Admin\TakjilController::class, 'showEnrolleWarga'])->name('apps.takjils.ranggal-ramadhans.showEnrolleWarga');

        Route::delete('/takjils/{takjil}/tanggal-ramadhans/{tanggal_ramadhan}/{takjil_group}/destroy', [\App\Http\Controllers\Admin\TakjilController::class, 'destroyEnrolleWarga'])->name('apps.takjils.tanggal-ramadhans.destroyEnrroleWarga');

        Route::delete('/takjils/{takjil}/tanggal-ramadhans/{tanggal_ramadhan}/destroy-all', [\App\Http\Controllers\Admin\TakjilController::class, 'destroyEnrolleWargaAll'])->name('apps.takjils.tanggal-ramadhans.destroyEnrroleWargaAll');

        Route::get('/takjils/{takjil}/pdf', [\App\Http\Controllers\Admin\TakjilController::class, 'pdf'])->name('apps.takjils.pdf');

        // petugas
        Route::get("/petugas/import", [\App\Http\Controllers\Admin\PetugasController::class, "import"])->name('apps.petugas.import');

        Route::post("/petugas/import/store", [\App\Http\Controllers\Admin\PetugasController::class, "storeImport"])->name('apps.petugas.storeImport');

        Route::resource("/petugas", \App\Http\Controllers\Admin\PetugasController::class, ['as' => 'apps']);
    });
});
