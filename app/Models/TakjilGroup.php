<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TakjilGroup extends Model
{
    use HasFactory;

    protected $table = 'takjil_group';
    protected $fillable = ['tanggal_ramadhan_id', 'warga_id'];
}
