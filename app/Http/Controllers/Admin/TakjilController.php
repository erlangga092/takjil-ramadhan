<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TakjilController extends Controller
{
    public function index()
    {
        $takjils = \App\Models\Takjil::with('masjid', 'tahun_ramadhan', 'masjid.dusun')->latest()->paginate(10);
        return \Inertia\Inertia::render('Apps/Takjil/index', compact('takjils'));
    }

    public function create()
    {
        $masjids = \App\Models\Masjid::with('dusun')->get();
        $tahun_ramadhans = \App\Models\TahunRamadhan::all();

        return \Inertia\Inertia::render('Apps/Takjil/Create', compact('masjids', 'tahun_ramadhans'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'masjid_id' => 'required|exists:masjid,id',
            'tahun_ramadhan_id' => 'required|exists:tahun_ramadhan,id',
            'jumlah_takjil' => 'required'
        ]);

        \App\Models\Takjil::create([
            'masjid_id' => $request->masjid_id,
            'tahun_ramadhan_id' => $request->tahun_ramadhan_id,
            'jumlah_takjil' => $request->jumlah_takjil
        ]);

        return redirect()->route('apps.takjils.index');
    }

    public function show($id)
    {
        $takjil = \App\Models\Takjil::with('masjid', 'tahun_ramadhan', 'masjid.dusun')->findOrFail($id);

        return \Inertia\Inertia::render('Apps/Takjil/Show', compact('takjil'));
    }
}
