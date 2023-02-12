<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TanggalRamadhan extends Model
{
    use HasFactory;

    protected $table = 'tanggal_ramadhan';
    protected $fillable = ['takjil_id', 'tanggal'];

    public function takjil()
    {
        return $this->belongsTo(\App\Models\Takjil::class);
    }

    public function takjil_groups()
    {
        return $this->hasMany(\App\Models\TakjilGroup::class);
    }

    protected function tanggal(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn ($value) => \Carbon\Carbon::create($value)->isoFormat('dddd, D MMMM Y')
        );
    }
}
