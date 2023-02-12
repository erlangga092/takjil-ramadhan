<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warga extends Model
{
    use HasFactory;

    protected $table = 'warga';
    protected $fillable = ['rt_id', 'masjid_id', 'name'];

    public function rt()
    {
        return $this->belongsTo(\App\Models\Rt::class);
    }

    public function masjid()
    {
        return $this->belongsTo(\App\Models\Masjid::class);
    }
}
