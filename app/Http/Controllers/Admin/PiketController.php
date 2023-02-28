<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PiketController extends Controller
{
    public function index()
    {
        $pikets = \App\Models\Piket::with('masjid', 'tahun_ramadhan', 'masjid.dusun')
            ->latest()
            ->paginate(10);

        return \Inertia\Inertia::render('Apps/Piket/index', compact('pikets'));
    }

    public function create()
    {
        $masjids = \App\Models\Masjid::with('dusun')->get();
        $tahun_ramadhans = \App\Models\TahunRamadhan::all();

        return \Inertia\Inertia::render('Apps/Piket/Create', compact('masjids', 'tahun_ramadhans'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'masjid_id' => 'required|exists:masjid,id',
            'tahun_ramadhan_id' => 'required|exists:tahun_ramadhan,id',
        ]);

        \App\Models\Piket::create([
            'masjid_id' => $request->masjid_id,
            'tahun_ramadhan_id' => $request->tahun_ramadhan_id,
        ]);

        return redirect()->route('apps.pikets.index');
    }

    public function edit($id)
    {
        $piket = \App\Models\Piket::findOrFail($id);
        $masjids = \App\Models\Masjid::with('dusun')->get();
        $tahun_ramadhans = \App\Models\TahunRamadhan::all();

        return \Inertia\Inertia::render('Apps/Piket/Edit', [
            'masjids' => $masjids,
            'tahun_ramadhans' => $tahun_ramadhans,
            'piket' => $piket
        ]);
    }

    public function update(Request $request, \App\Models\Piket $piket)
    {
        $this->validate($request, [
            'masjid_id' => 'required|exists:masjid,id',
            'tahun_ramadhan_id' => 'required|exists:tahun_ramadhan,id',
        ]);

        $piket->update([
            'masjid_id' => $request->masjid_id,
            'tahun_ramadhan_id' => $request->tahun_ramadhan_id,
        ]);

        return redirect()->route('apps.pikets.index');
    }

    public function show($id)
    {
        $piket = \App\Models\Piket::with('masjid', 'tahun_ramadhan', 'masjid.dusun')
            ->findOrFail($id);

        $piket->setRelation('tanggal_pikets', $piket->tanggal_pikets()
            ->with('piket_groups.petugas')
            ->orderBy('tanggal', 'ASC')
            ->paginate(31));


        return \Inertia\Inertia::render('Apps/Piket/Show', compact('piket'));
    }

    public function createTanggalPiket(\App\Models\Piket $piket)
    {
        return \Inertia\Inertia::render('Apps/Tanggal-Piket/Create', compact('piket'));
    }

    public function storeTanggalPiket(Request $request, \App\Models\Piket $piket)
    {
        $this->validate($request, [
            'piket_id' => 'required|exists:piket,id',
            'tanggal' => 'required'
        ]);

        \App\Models\TanggalPiket::create([
            'piket_id' => $request->piket_id,
            'tanggal' => date('Y-m-d H:i:s', strtotime($request->tanggal))
        ]);

        return redirect()->route('apps.pikets.show', $piket);
    }

    public function destroyTanggalPiket(\App\Models\Piket $piket, $id)
    {
        try {
            $tanggal_piket = \App\Models\TanggalPiket::findOrFail($id);
            $tanggal_piket->delete();
            return redirect()->route('apps.pikets.show', $piket->id);
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function showEnrollePetugas(\App\Models\Piket $piket, $id)
    {
        $tanggal_piket = \App\Models\TanggalPiket::with('piket.masjid', 'piket.tahun_ramadhan')->findOrFail($id);

        $tanggal_piket->setRelation('piket_groups', $tanggal_piket->piket_groups()->with('petugas', 'petugas.rt', 'petugas.rt.rw')->paginate(10));

        return \Inertia\Inertia::render('Apps/Tanggal-Piket/Show', [
            'tanggal_piket' => $tanggal_piket,
            'piket' => $piket
        ]);
    }

    public function createEnrollePetugas(\App\Models\Piket $piket, $id)
    {
        $tanggal_piket = \App\Models\TanggalPiket::findOrFail($id);
        $petugas_enrolled = \App\Models\PiketGroup::where('piket_id', $piket->id)
            ->pluck('petugas_id')
            ->all();

        $petugas = \App\Models\Petugas::when(request()->q, function ($value) {
            return $value->where('name', 'like', '%' . request()->q . '%');
        })->with('rt', 'rt.rw')
            ->where('masjid_id', $piket->masjid->id)
            ->whereNotIn('id', $petugas_enrolled)
            ->paginate(10);

        return \Inertia\Inertia::render("Apps/Piket-Group/Create", [
            'petugas' => $petugas,
            'piket' => $piket,
            'tanggal_piket' => $tanggal_piket
        ]);
    }

    public function storeEnrollePetugas(Request $request, \App\Models\Piket $piket, $id)
    {
        $this->validate($request, [
            'piket_id' => 'required|exists:piket,id',
            'tanggal_piket_id' => 'required|exists:tanggal_pikets,id',
            'petugas_id' => 'required|exists:petugas,id',
        ]);

        $tanggal_piket = \App\Models\TanggalPiket::findOrFail($id);

        foreach ($request->petugas_id as $petugas_id) {
            $petugas = \App\Models\Petugas::findOrFail($petugas_id);

            \App\Models\PiketGroup::create([
                'piket_id' => $request->piket_id,
                'tanggal_piket_id' => $request->tanggal_piket_id,
                'petugas_id' => $petugas->id,
            ]);
        }

        return redirect()->route('apps.pikets.ranggal-pikets.showEnrollePetugas', [
            'piket' => $piket->id,
            'tanggal_piket' => $tanggal_piket->id
        ]);
    }

    public function destroyEnrollePetugas(
        \App\Models\Piket $piket,
        \App\Models\TanggalPiket $tanggal_piket,
        \App\Models\PiketGroup $piket_group
    ) {
        try {
            $piket_group->delete();
            return redirect()->route('apps.pikets.tanggal-pikets.showEnrollePetugas', [
                'piket' => $piket->id,
                'tanggal_piket' => $tanggal_piket->id
            ]);
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function destroyEnrollePetugasAll(
        Request $request,
        \App\Models\Piket $piket,
        \App\Models\TanggalPiket $tanggal_piket,
    ) {
        try {
            \App\Models\PiketGroup::whereIn('id', $request->piket_group_id)->delete();
            return redirect()->route('apps.pikets.tanggal-pikets.showEnrollePetugas', [
                'piket' => $piket->id,
                'tanggal_piket' => $tanggal_piket->id
            ]);
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }
}
