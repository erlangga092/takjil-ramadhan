<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RTController extends Controller
{
    public function index()
    {
        $rts = \App\Models\Rt::when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->with('rw', 'rw.dusun', 'rw.dusun.kelurahan')->latest()->paginate(10);

        return \Inertia\Inertia::render("Apps/Rt/index", compact('rts'));
    }

    public function create()
    {
        $rws = \App\Models\Rw::all();
        return \Inertia\Inertia::render("Apps/Rt/Create", compact('rws'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'rw_id' => 'required|exists:rw,id'
        ]);

        \App\Models\Rt::create([
            'name' => $request->name,
            'rw_id' => $request->rw_id
        ]);

        return redirect()->route('apps.rts.index');
    }

    public function edit($id)
    {
        $rt = \App\Models\Rt::findOrFail($id);
        $rws = \App\Models\Rw::all();

        return \Inertia\Inertia::render('Apps/Rt/Edit', compact('rt', 'rws'));
    }

    public function update(Request $request, \App\Models\Rt $rt)
    {
        $this->validate($request, [
            'name' => 'required',
            'rw_id' => 'required|exists:rw,id'
        ]);

        $rt->update([
            'name' => $request->name,
            'rw_id' => $request->rw_id
        ]);

        return redirect()->route('apps.rts.index');
    }

    public function destroy($id)
    {
        try {
            $rt = \App\Models\Rt::findOrFail($id);
            $rt->delete();
            return redirect()->route('apps.rts.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }
}
