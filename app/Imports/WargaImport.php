<?php

namespace App\Imports;

use App\Models\Warga;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class WargaImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Warga([
            'name' => $row['nama'],
            'rt_id' => $row['rt'],
            'masjid_id' => $row['masjid'],
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'rt_id' => 'required|exists:rt,id',
            'masjid_id' => 'required|exists:masjid,id',
        ]
    }
}
