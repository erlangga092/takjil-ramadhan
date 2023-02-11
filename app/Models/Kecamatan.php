<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model
{
    use HasFactory;

    protected $table = 'kecamatan';
    protected $fillable = ['kabupaten_id', 'name'];

    public function kabupaten()
    {
        return $this->belongsTo(\App\Models\Kabupaten::class);
    }
}
