<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KecamatanController extends Controller
{
    public function index()
    {
        $kecamatans = \App\Models\Kecamatan::with('kabupaten')->when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return \Inertia\Inertia::render("Apps/Kecamatan/index", compact('kecamatans'));
    }

    public function create()
    {
        $kabupatens = \App\Models\Kabupaten::all();
        return \Inertia\Inertia::render("Apps/Kecamatan/Create", compact('kabupatens'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'kabupaten_id' => 'required|exists:kabupaten,id'
        ]);

        \App\Models\Kecamatan::create([
            'name' => $request->name,
            'kabupaten_id' => $request->kabupaten_id
        ]);

        return redirect()->route('apps.kecamatans.index');
    }

    public function edit($id)
    {
        $kecamatan = \App\Models\Kecamatan::findOrFail($id);
        return \Inertia\Inertia::render('Apps/Kecamatan/Edit', compact('kecamatan'));
    }

    public function update(Request $request, \App\Models\Kecamatan $kecamatan)
    {
        $this->validate($request, [
            'name' => 'required',
            'kabupaten_id' => 'required'
        ]);

        $kecamatan->update([
            'name' => $request->name,
            'kabupaten_id' => $request->kabupaten_id
        ]);

        return redirect()->route('apps.kecamatans.index');
    }

    public function destroy($id)
    {
        try {
            $kecamatan = \App\Models\Kecamatan::findOrFail($id);
            $kecamatan->delete();
            return redirect()->route('apps.kecamatans.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }
}
