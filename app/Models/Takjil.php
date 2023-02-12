<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Takjil extends Model
{
    use HasFactory;

    protected $table = 'takjil';
    protected $fillable = ['masjid_id', 'tahun_ramadhan_id', 'jumlah_takjil'];

    public function masjid()
    {
        return $this->belongsTo(\App\Models\Masjid::class);
    }

    public function tahun_ramadhan()
    {
        return $this->belongsTo(\App\Models\TahunRamadhan::class);
    }
}
