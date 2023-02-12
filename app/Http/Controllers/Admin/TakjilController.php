<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TanggalRamadhan;
use Illuminate\Http\Request;

class TakjilController extends Controller
{
    public function index()
    {
        $takjils = \App\Models\Takjil::with('masjid', 'tahun_ramadhan', 'masjid.dusun')
            ->latest()
            ->paginate(10);

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
        $takjil = \App\Models\Takjil::with('masjid', 'tahun_ramadhan', 'masjid.dusun')
            ->findOrFail($id);

        $takjil->setRelation('tanggal_ramadhans', $takjil->tanggal_ramadhans()
            ->orderBy('tanggal', 'ASC')
            ->paginate(10));

        return \Inertia\Inertia::render('Apps/Takjil/Show', compact('takjil'));
    }

    public function createTanggalRamadhan(\App\Models\Takjil $takjil)
    {
        return \Inertia\Inertia::render('Apps/Tanggal-Ramadhan/Create', compact('takjil'));
    }

    public function storeTanggalRamadhan(Request $request, \App\Models\Takjil $takjil)
    {
        $this->validate($request, [
            'takjil_id' => 'required|exists:takjil,id',
            'tanggal' => 'required'
        ]);

        \App\Models\TanggalRamadhan::create([
            'takjil_id' => $request->takjil_id,
            'tanggal' => date('Y-m-d H:i:s', strtotime($request->tanggal))
        ]);

        return redirect()->route('apps.takjils.show', $takjil);
    }

    public function destroyTanggalRamadhan(\App\Models\Takjil $takjil, $id)
    {
        try {
            $tanggal_ramadhan = \App\Models\TanggalRamadhan::findOrFail($id);
            $tanggal_ramadhan->delete();
            return redirect()->route('apps.takjils.show', $takjil->id);
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function showEnrolleWarga(\App\Models\Takjil $takjil, $id)
    {
        $tanggal_ramadhan = \App\Models\TanggalRamadhan::with('takjil.masjid', 'takjil.tahun_ramadhan')->findOrFail($id);

        $tanggal_ramadhan->setRelation('takjil_groups', $tanggal_ramadhan->takjil_groups()->with('warga', 'warga.rt', 'warga.rt.rw')->paginate(10));

        return \Inertia\Inertia::render('Apps/Tanggal-Ramadhan/Show', [
            'tanggal_ramadhan' => $tanggal_ramadhan,
            'takjil' => $takjil
        ]);
    }

    public function createEnrolleWarga(\App\Models\Takjil $takjil, $id)
    {
        $tanggal_ramadhan = \App\Models\TanggalRamadhan::findOrFail($id);
        // $takjil = $tanggal_ramadhan->takjil;
        $wargas_enrolled = \App\Models\TakjilGroup::where('takjil_id', $takjil->id)
            ->where('tanggal_ramadhan_id', $tanggal_ramadhan->id)
            ->pluck('warga_id')
            ->all();

        $wargas = \App\Models\Warga::with('rt', 'rt.rw')
            ->where('masjid_id', $takjil->masjid->id)
            ->whereNotIn('id', $wargas_enrolled)
            ->paginate(10);

        return \Inertia\Inertia::render("Apps/Takjil-Group/Create", [
            'wargas' => $wargas,
            'takjil' => $takjil,
            'tanggal_ramadhan' => $tanggal_ramadhan
        ]);
    }

    public function storeEnrolleWarga(Request $request, \App\Models\Takjil $takjil, $id)
    {
        $this->validate($request, [
            'takjil_id' => 'required|exists:takjil,id',
            'tanggal_ramadhan_id' => 'required|exists:tanggal_ramadhan,id',
            'warga_id' => 'required|exists:warga,id',
        ]);

        $tanggal_ramadhan = \App\Models\TanggalRamadhan::findOrFail($id);

        foreach ($request->warga_id as $warga_id) {
            $warga = \App\Models\Warga::findOrFail($warga_id);

            \App\Models\TakjilGroup::create([
                'takjil_id' => $request->takjil_id,
                'tanggal_ramadhan_id' => $request->tanggal_ramadhan_id,
                'warga_id' => $warga->id,
            ]);
        }

        return redirect()->route('apps.takjils.ranggal-ramadhans.showEnrolleWarga', [
            'takjil' => $takjil->id,
            'tanggal_ramadhan' => $tanggal_ramadhan->id
        ]);
    }
}
