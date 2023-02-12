<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MasjidController extends Controller
{
    public function index()
    {
        $masjids = \App\Models\Masjid::when(request()->q, function ($value) {
            return $value->where('name', 'LIKE', '%' . request()->q . '%');
        })->with('dusun')->latest()->paginate(5);

        return \Inertia\Inertia::render('Apps/Masjid/index', compact('masjids'));
    }

    public function create()
    {
        $dusuns = \App\Models\Dusun::all();
        return \Inertia\Inertia::render('Apps/Masjid/Create', compact('dusuns'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'dusun_id' => 'required|exists:dusun,id',
            'name' => 'required',
            'alamat' => 'required'
        ]);

        \App\Models\Masjid::create([
            'dusun_id' => $request->dusun_id,
            'name' => $request->name,
            'alamat' => $request->alamat
        ]);

        return redirect()->route('apps.masjids.index');
    }
}
