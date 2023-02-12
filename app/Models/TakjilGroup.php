<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TakjilGroup extends Model
{
    use HasFactory;

    protected $table = 'takjil_group';
    protected $fillable = ['tanggal_ramadhan_id', 'warga_id', 'takjil_id'];

    public function warga()
    {
        return $this->belongsTo(\App\Models\Warga::class);
    }

    public function tanggal_ramadhan()
    {
        return $this->belongsTo(\App\Models\TanggalRamadhan::class);
    }
}
