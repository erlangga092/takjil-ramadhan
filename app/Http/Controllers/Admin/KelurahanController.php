<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KelurahanController extends Controller
{
    public function index()
    {
        $kelurahans = \App\Models\Kelurahan::with('kecamatan')->when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return \Inertia\Inertia::render("Apps/Kelurahan/index", compact('kelurahans'));
    }

    public function create()
    {
        $kecamatans = \App\Models\Kecamatan::all();
        return \Inertia\Inertia::render("Apps/Kelurahan/Create", compact('kecamatans'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'kecamatan_id' => 'required|exists:kecamatan,id'
        ]);

        \App\Models\Kelurahan::create([
            'name' => $request->name,
            'kecamatan_id' => $request->kecamatan_id
        ]);

        return redirect()->route('apps.kelurahans.index');
    }

    public function edit($id)
    {
        $kelurahan = \App\Models\Kelurahan::findOrFail($id);
        $kecamatans = \App\Models\Kecamatan::all();

        return \Inertia\Inertia::render('Apps/Kelurahan/Edit', compact('kelurahan', 'kecamatans'));
    }

    public function update(Request $request, \App\Models\Kelurahan $Kelurahan)
    {
        $this->validate($request, [
            'name' => 'required',
            'kecamatan_id' => 'required'
        ]);

        $Kelurahan->update([
            'name' => $request->name,
            'kecamatan_id' => $request->kecamatan_id
        ]);

        return redirect()->route('apps.kelurahans.index');
    }

    public function destroy($id)
    {
        try {
            $Kelurahan = \App\Models\Kelurahan::findOrFail($id);
            $Kelurahan->delete();
            return redirect()->route('apps.kelurahans.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }
}
