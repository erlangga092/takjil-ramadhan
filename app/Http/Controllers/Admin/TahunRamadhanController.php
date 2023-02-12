<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TahunRamadhanController extends Controller
{
    public function index()
    {
        $tahun_ramadhans = \App\Models\TahunRamadhan::when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return \Inertia\Inertia::render("Apps/Tahun-Ramadhan/index", compact('tahun_ramadhans'));
    }

    public function create()
    {
        return \Inertia\Inertia::render("Apps/Tahun-Ramadhan/Create");
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);

        \App\Models\TahunRamadhan::create(['name' => $request->name]);
        return redirect()->route('apps.tahun-ramadhans.index');
    }

    public function edit($id)
    {
        $tahun_ramadhan = \App\Models\TahunRamadhan::findOrFail($id);
        return \Inertia\Inertia::render('Apps/Tahun-Ramadhan/Edit', compact('tahun_ramadhan'));
    }

    public function update(Request $request, \App\Models\TahunRamadhan $kabupaten)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);

        $kabupaten->update(['name' => $request->name]);
        return redirect()->route('apps.tahun-ramadhans.index');
    }

    public function destroy($id)
    {
        try {
            $kabupaten = \App\Models\TahunRamadhan::findOrFail($id);
            $kabupaten->delete();
            return redirect()->route('apps.tahun-ramadhans.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }
}
