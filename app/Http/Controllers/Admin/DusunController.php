<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DusunController extends Controller
{
    public function index()
    {
        $dusuns = \App\Models\Dusun::with('kelurahan')->when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return \Inertia\Inertia::render("Apps/Dusun/index", compact('dusuns'));
    }

    public function create()
    {
        $kelurahans = \App\Models\Kelurahan::all();
        return \Inertia\Inertia::render("Apps/Dusun/Create", compact('kelurahans'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'kelurahan_id' => 'required|exists:kelurahan,id'
        ]);

        \App\Models\Dusun::create([
            'name' => $request->name,
            'kelurahan_id' => $request->kelurahan_id
        ]);

        return redirect()->route('apps.dusuns.index');
    }

    public function edit($id)
    {
        $dusun = \App\Models\Dusun::findOrFail($id);
        return \Inertia\Inertia::render('Apps/Dusun/Edit', compact('dusun'));
    }

    public function update(Request $request, \App\Models\Dusun $Dusun)
    {
        $this->validate($request, [
            'name' => 'required',
            'kelurahan_id' => 'required'
        ]);

        $Dusun->update([
            'name' => $request->name,
            'kelurahan_id' => $request->kelurahan_id
        ]);

        return redirect()->route('apps.dusuns.index');
    }

    public function destroy($id)
    {
        try {
            $dusun = \App\Models\Dusun::findOrFail($id);
            $dusun->delete();
            return redirect()->route('apps.dusuns.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }
}
