<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Piket extends Model
{
    use HasFactory;
    protected $table = 'piket';
    protected $fillable = ['masjid_id', 'tahun_ramadhan_id'];

    public function masjid()
    {
        return $this->belongsTo(\App\Models\Masjid::class);
    }

    public function tahun_ramadhan()
    {
        return $this->belongsTo(\App\Models\TahunRamadhan::class);
    }

    public function tanggal_pikets()
    {
        return $this->hasMany(\App\Models\TanggalPiket::class);
    }

    public function piket_groups()
    {
        return $this->hasMany(\App\Models\PiketGroup::class);
    }
}
