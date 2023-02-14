<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RWController extends Controller
{
    public function index()
    {
        $rws = \App\Models\Rw::when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->with('dusun', 'dusun.kelurahan', 'dusun.kelurahan.kecamatan')->latest()->paginate(5);

        return \Inertia\Inertia::render("Apps/Rw/index", compact('rws'));
    }

    public function create()
    {
        $dusuns = \App\Models\Dusun::all();
        return \Inertia\Inertia::render("Apps/Rw/Create", compact('dusuns'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'dusun_id' => 'required|exists:dusun,id'
        ]);

        \App\Models\Rw::create([
            'name' => $request->name,
            'dusun_id' => $request->dusun_id
        ]);

        return redirect()->route('apps.rws.index');
    }

    public function edit($id)
    {
        $rw = \App\Models\Rw::findOrFail($id);
        $dusuns = \App\Models\Dusun::all();

        return \Inertia\Inertia::render('Apps/Rw/Edit', compact('rw', 'dusuns'));
    }

    public function update(Request $request, \App\Models\Rw $rw)
    {
        $this->validate($request, [
            'name' => 'required',
            'dusun_id' => 'required|exists:dusun,id"'
        ]);

        $rw->update([
            'name' => $request->name,
            'dusun_id' => $request->dusun_id
        ]);

        return redirect()->route('apps.rws.index');
    }

    public function destroy($id)
    {
        try {
            $rw = \App\Models\Rw::findOrFail($id);
            $rw->delete();
            return redirect()->route('apps.rws.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }
}
