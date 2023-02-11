<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TanggalRamadhan extends Model
{
    use HasFactory;

    protected $table = 'tanggal_ramadhan';
    protected $fillable = ['takjil_id', 'tanggal'];
}
