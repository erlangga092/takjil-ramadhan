<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PetugasController extends Controller
{
    public function index()
    {
        $petugas = \App\Models\Petugas::when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->with('rt', 'rt.rw', 'rt.rw.dusun', 'masjid')->latest()->paginate(10);

        return \Inertia\Inertia::render('Apps/Petugas/index', compact('petugas'));
    }

    public function create()
    {
        $rts = \App\Models\Rt::with('rw', 'rw.dusun', 'rw.dusun.kelurahan', 'rw.dusun.kelurahan.kecamatan')->get();
        $masjids = \App\Models\Masjid::with('dusun')->get();

        return \Inertia\Inertia::render('Apps/Petugas/Create', compact('rts', 'masjids'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'rt_id' => 'required|exists:rt,id',
            'masjid_id' => 'required|exists:masjid,id',
            'name' => 'required'
        ]);

        \App\Models\Petugas::create([
            'rt_id' => $request->rt_id,
            'masjid_id' => $request->masjid_id,
            'name' => $request->name
        ]);

        return redirect()->route('apps.petugas.index');
    }

    public function edit($id)
    {
        $warga = \App\Models\Petugas::findOrFail($id);
        $rts = \App\Models\Rt::all();
        $masjids = \App\Models\Masjid::all();

        return \Inertia\Inertia::render('Apps/Petugas/Edit', compact('petugas', 'rts', 'masjids'));
    }

    public function update(Request $request, \App\Models\Petugas $petugas)
    {
        $this->validate($request, [
            'rt_id' => 'required|exists:rt,id',
            'masjid_id' => 'required|exists:masjid,id',
            'name' => 'required'
        ]);

        $petugas->update([
            'rt_id' => $request->rt_id,
            'masjid_id' => $request->masjid_id,
            'name' => $request->name
        ]);

        return redirect()->route('apps.petugas.index');
    }

    public function destroy($id)
    {
        try {
            $petugas = \App\Models\Petugas::findOrFail($id);
            $petugas->delete();
            return redirect()->route('apps.petugas.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function import()
    {
        return \Inertia\Inertia::render("Apps/Petugas/Import");
    }

    public function storeImport(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|mimes:csv,xls,xlsx'
        ]);

        \Maatwebsite\Excel\Facades\Excel::import(new \App\Imports\PetugasImport(), $request->file('file'));

        return redirect()->route('apps.petugas.index');
    }
}
