<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rt extends Model
{
    use HasFactory;

    protected $table = 'rt';
    protected $fillable = ['rw_id', 'name'];

    public function rw()
    {
        return $this->belongsTo(\App\Models\Rw::class);
    }
}
