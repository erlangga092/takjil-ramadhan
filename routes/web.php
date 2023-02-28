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

        Route::get("dashboard", \App\Http\Controllers\Admin\DashboardController::class)->name('apps.dashboard');

        Route::group(array(), function () {
            Route::resource("/kabupatens", \App\Http\Controllers\Admin\KabupatenController::class, ['as' => 'apps']);

            Route::resource("/kecamatans", \App\Http\Controllers\Admin\KecamatanController::class, ['as' => 'apps']);

            Route::resource("/kelurahans", \App\Http\Controllers\Admin\KelurahanController::class, ['as' => 'apps']);

            Route::resource("/dusuns", \App\Http\Controllers\Admin\DusunController::class, ['as' => 'apps']);

            Route::resource("/rws", \App\Http\Controllers\Admin\RWController::class, ['as' => 'apps']);

            Route::resource("/rts", \App\Http\Controllers\Admin\RTController::class, ['as' => 'apps']);
        });

        Route::group(array(), function () {
            Route::get("/wargas/import", [\App\Http\Controllers\Admin\WargaController::class, "import"])->name('apps.wargas.import');

            Route::post("/wargas/import/store", [\App\Http\Controllers\Admin\WargaController::class, "storeImport"])->name('apps.wargas.storeImport');

            Route::resource("/wargas", \App\Http\Controllers\Admin\WargaController::class, ['as' => 'apps']);
        });


        Route::resource("/masjids", \App\Http\Controllers\Admin\MasjidController::class, ['as' => 'apps']);

        Route::resource("/tahun-ramadhans", \App\Http\Controllers\Admin\TahunRamadhanController::class, ['as' => 'apps']);

        Route::group(array(), function () {

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
        });

        Route::group(array(), function () {

            Route::get("/petugas/import", [\App\Http\Controllers\Admin\PetugasController::class, "import"])->name('apps.petugas.import');

            Route::post("/petugas/import/store", [\App\Http\Controllers\Admin\PetugasController::class, "storeImport"])->name('apps.petugas.storeImport');

            Route::resource("/petugas", \App\Http\Controllers\Admin\PetugasController::class, ['as' => 'apps']);
        });

        Route::group(array(), function () {

            Route::delete("/pikets/{piket}/tanggal-pikets/{tanggalPiket}/destroy", [\App\Http\Controllers\Admin\PiketController::class, 'destroyTanggalPiket'])->name('apps.takjils.destroyTanggalPiket');

            Route::get("/pikets/{piket}/tanggal-pikets/create", [\App\Http\Controllers\Admin\PiketController::class, 'createTanggalPiket'])->name('apps.pikets.createTanggalPiket');

            Route::post("/pikets/{piket}/tanggal-pikets/store", [\App\Http\Controllers\Admin\PiketController::class, 'storeTanggalPiket'])->name('apps.pikets.storeTanggalPiket');

            Route::resource("/pikets", \App\Http\Controllers\Admin\PiketController::class, ['as' => 'apps']);

            Route::get("/pikets/{piket}/tanggal-pikets/{tanggalPiket}/create", [\App\Http\Controllers\Admin\PiketController::class, 'createEnrollePetugas'])->name('apps.pikets.tanggal-pikets.createEnrollePetugas');

            Route::post("/pikets/{piket}/tanggal-pikets/{tanggalPiket}/store", [\App\Http\Controllers\Admin\PiketController::class, 'storeEnrollePetugas'])->name('apps.pikets.tanggal-pikets.storeEnrollePetugas');

            Route::get("/pikets/{piket}/tanggal-pikets/{tanggal_piket}", [\App\Http\Controllers\Admin\PiketController::class, 'showEnrollePetugas'])->name('apps.pikets.tanggal-pikets.showEnrollePetugas');

            Route::delete('/pikets/{piket}/tanggal-pikets/{tanggal_piket}/{piket_group}/destroy', [\App\Http\Controllers\Admin\PiketController::class, 'destroyEnrollePetugas'])->name('apps.pikets.tanggal-pikets.destroyEnrrolePetugas');

            Route::delete('/pikets/{piket}/tanggal-pikets/{tanggal_piket}/destroy-all', [\App\Http\Controllers\Admin\PiketController::class, 'destroyEnrollePetugasAll'])->name('apps.pikets.tanggal-pikets.destroyEnrrolePetugasAll');
        });
    });
});
