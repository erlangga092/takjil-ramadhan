<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class KabupatenController extends Controller
{
    public function index()
    {
        $kabupatens = \App\Models\Kabupaten::when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return \Inertia\Inertia::render("Apps/Kabupaten/index", compact('kabupatens'));
    }

    public function create()
    {
        return \Inertia\Inertia::render("Apps/Kabupaten/Create");
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);

        \App\Models\Kabupaten::create(['name' => $request->name]);
        return redirect()->route('apps.kabupatens.index');
    }

    public function edit($id)
    {
        $kabupaten = \App\Models\Kabupaten::findOrFail($id);
        return \Inertia\Inertia::render('Apps/Kabupaten/Edit', compact('kabupaten'));
    }

    public function update(Request $request, \App\Models\Kabupaten $kabupaten)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);

        $kabupaten->update(['name' => $request->name]);
        return redirect()->route('apps.kabupatens.index');
    }

    public function destroy($id)
    {
        try {
            $kabupaten = \App\Models\Kabupaten::findOrFail($id);
            $kabupaten->delete();
            return redirect()->route('apps.kabupatens.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }
}
