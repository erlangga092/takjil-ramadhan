<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Masjid extends Model
{
    use HasFactory;

    protected $table = 'masjid';
    protected $fillable = ['dusun_id', 'name', 'alamat'];

    public function dusun()
    {
        return $this->belongsTo(\App\Models\Dusun::class);
    }
}
