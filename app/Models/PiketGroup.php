<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PiketGroup extends Model
{
    use HasFactory;

    protected $table = 'piket_group';
    protected $fillable = ['tanggal_piket_id', 'petugas_id', 'piket_id'];

    public function petugas()
    {
        return $this->belongsTo(\App\Models\Petugas::class);
    }

    public function tanggal_piket()
    {
        return $this->belongsTo(\App\Models\TanggalPiket::class);
    }
}
