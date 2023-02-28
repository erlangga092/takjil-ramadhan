<?php

namespace App\Imports;

use App\Models\Petugas;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class PetugasImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Petugas([
            'name' => $row['name'],
            'rt_id' => (int) $row['rt_id'],
            'masjid_id' => (int) $row['masjid_id'],
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => 'required',
            'rt_id' => 'required|exists:rt,id',
            'masjid_id' => 'required|exists:masjid,id',
        ];
    }
}
