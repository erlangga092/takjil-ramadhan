<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

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

    public function edit($id)
    {
        $takjil = \App\Models\Takjil::findOrFail($id);
        $masjids = \App\Models\Masjid::with('dusun')->get();
        $tahun_ramadhans = \App\Models\TahunRamadhan::all();

        return \Inertia\Inertia::render('Apps/Takjil/Edit', [
            'masjids' => $masjids,
            'tahun_ramadhans' => $tahun_ramadhans,
            'takjil' => $takjil
        ]);
    }

    public function update(Request $request, \App\Models\Takjil $takjil)
    {
        $this->validate($request, [
            'masjid_id' => 'required|exists:masjid,id',
            'tahun_ramadhan_id' => 'required|exists:tahun_ramadhan,id',
            'jumlah_takjil' => 'required'
        ]);

        $takjil->update([
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
            ->with('takjil_groups.warga')
            ->orderBy('tanggal', 'ASC')
            ->paginate(31));


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
        $wargas_enrolled = \App\Models\TakjilGroup::where('takjil_id', $takjil->id)
            ->pluck('warga_id')
            ->all();

        $wargas = \App\Models\Warga::when(request()->q, function ($value) {
            return $value->where('name', 'like', '%' . request()->q . '%');
        })->with('rt', 'rt.rw')
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

    public function destroyEnrolleWarga(
        \App\Models\Takjil $takjil,
        \App\Models\TanggalRamadhan $tanggal_ramadhan,
        \App\Models\TakjilGroup $takjil_group
    ) {
        try {
            $takjil_group->delete();
            return redirect()->route('apps.takjils.ranggal-ramadhans.showEnrolleWarga', [
                'takjil' => $takjil->id,
                'tanggal_ramadhan' => $tanggal_ramadhan->id
            ]);
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function destroyEnrolleWargaAll(
        Request $request,
        \App\Models\Takjil $takjil,
        \App\Models\TanggalRamadhan $tanggal_ramadhan,
    ) {
        try {
            \App\Models\TakjilGroup::whereIn('id', $request->takjil_group_id)->delete();
            return redirect()->route('apps.takjils.ranggal-ramadhans.showEnrolleWarga', [
                'takjil' => $takjil->id,
                'tanggal_ramadhan' => $tanggal_ramadhan->id
            ]);
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function pdf(\App\Models\Takjil $takjil)
    {
        $value = DB::select(DB::raw("SELECT
        tr.tanggal as tanggal,
        t.id as t_id,
        w.name as warga,
        rt.name as RT,
        rw.name as RW
    from takjil_group as tg
        JOIN takjil as t on t.id = tg.takjil_id
        JOIN tanggal_ramadhan as tr on tg.tanggal_ramadhan_id = tr.id
        JOIN warga as w on w.id = tg.warga_id
        JOIN rt on rt.id = w.rt_id
        JOIN rw on rw.id = rt.rw_id
    WHERE t.id = 1
    ORDER BY tanggal ASC"));

        $data = array_group_by($value, "tanggal");
        $length = 8;
        $data_split = array();
        $k = 0;

        foreach ($data as $key => $item) {
            $data_split[$k][$key] = $item;
            if (count($data_split[$k]) > $length) {
                $k++;
            }
        }

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView("exports.takjil", compact('data_split'));
        // $pdf->setPaper('F4', 'portrait');
        $pdf->setPaper(array(0, 0, 609.449, 935.433), 'portrait');
        $output = $pdf->output();

        return new Response($output, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' =>  'inline; filename="takjil.pdf"',
        ]);
    }
}
