<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Takjil extends Model
{
    use HasFactory;

    protected $table = 'takjil';
    protected $fillable = ['masjid_id', 'tahun_ramadhan_id', 'jumlah_takjil'];
}
