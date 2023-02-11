<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dusun extends Model
{
    use HasFactory;

    protected $table = 'dusun';
    protected $fillable = ['kelurahan_id', 'name'];

    public function kelurahan()
    {
        return $this->belongsTo(\App\Models\Kelurahan::class);
    }
}
