<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TanggalPiket extends Model
{
    use HasFactory;

    protected $table = 'tanggal_piket';
    protected $fillable = ['piket_id', 'tanggal'];

    public function piket()
    {
        return $this->belongsTo(\App\Models\Piket::class);
    }

    public function piket_groups()
    {
        return $this->hasMany(\App\Models\PiketGroup::class);
    }

    protected function tanggal(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn ($value) => \Carbon\Carbon::create($value)->isoFormat('dddd, D MMMM Y')
        );
    }
}
