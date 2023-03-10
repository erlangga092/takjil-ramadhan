<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rw extends Model
{
    use HasFactory;

    protected $table = 'rw';
    protected $fillable = ['dusun_id', 'name'];

    public function dusun()
    {
        return $this->belongsTo(\App\Models\Dusun::class);
    }
}
