<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TahunRamadhan extends Model
{
    use HasFactory;

    protected $table = 'tahun_ramadhan';
    protected $fillable = ['name'];
}
