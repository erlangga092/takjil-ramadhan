<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WargaController extends Controller
{
    public function index()
    {
        $wargas = \App\Models\Warga::when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->with('rt', 'rt.rw', 'rt.rw.dusun', 'masjid')->latest()->paginate(10);

        return \Inertia\Inertia::render('Apps/Warga/index', compact('wargas'));
    }

    public function create()
    {
        $rts = \App\Models\Rt::with('rw', 'rw.dusun', 'rw.dusun.kelurahan', 'rw.dusun.kelurahan.kecamatan')->get();
        $masjids = \App\Models\Masjid::with('dusun')->get();

        return \Inertia\Inertia::render('Apps/Warga/Create', compact('rts', 'masjids'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'rt_id' => 'required|exists:rt,id',
            'masjid_id' => 'required|exists:masjid,id',
            'name' => 'required'
        ]);

        \App\Models\Warga::create([
            'rt_id' => $request->rt_id,
            'masjid_id' => $request->masjid_id,
            'name' => $request->name
        ]);

        return redirect()->route('apps.wargas.index');
    }

    public function edit($id)
    {
        $warga = \App\Models\Warga::findOrFail($id);
        $rts = \App\Models\Rt::all();
        $masjids = \App\Models\Masjid::all();

        return \Inertia\Inertia::render('Apps/Warga/Edit', compact('warga', 'rts', 'masjids'));
    }

    public function update(Request $request, \App\Models\Warga $warga)
    {
        $this->validate($request, [
            'rt_id' => 'required|exists:rt,id',
            'masjid_id' => 'required|exists:masjid,id',
            'name' => 'required'
        ]);

        $warga->update([
            'rt_id' => $request->rt_id,
            'masjid_id' => $request->masjid_id,
            'name' => $request->name
        ]);

        return redirect()->route('apps.wargas.index');
    }

    public function destroy($id)
    {
        try {
            $warga = \App\Models\Warga::findOrFail($id);
            $warga->delete();
            return redirect()->route('apps.wargas.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function import()
    {
        return \Inertia\Inertia::render("Apps/Warga/Import");
    }

    public function storeImport(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|mimes:csv,xls,xlsx'
        ]);

        \Maatwebsite\Excel\Facades\Excel::import(new \App\Imports\WargaImport(), $request->file('file'));

        return redirect()->route('apps.wargas.index');
    }
}
