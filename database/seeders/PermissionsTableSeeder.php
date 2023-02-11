<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // dashboard
        Permission::create(['name' => 'dashboard.index', 'guard_name' => 'web']);

        // kelurahan
        Permission::create(['name' => 'kelurahan.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'kelurahan.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'kelurahan.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'kelurahan.delete', 'guard_name' => 'web']);

        // rw
        Permission::create(['name' => 'rw.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'rw.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'rw.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'rw.delete', 'guard_name' => 'web']);

        // rt
        Permission::create(['name' => 'rt.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'rt.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'rt.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'rt.delete', 'guard_name' => 'web']);

        // warga
        Permission::create(['name' => 'warga.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'warga.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'warga.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'warga.delete', 'guard_name' => 'web']);

        // tahun ramadhan
        Permission::create(['name' => 'tahun_ramadhan.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'tahun_ramadhan.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'tahun_ramadhan.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'tahun_ramadhan.delete', 'guard_name' => 'web']);

        // tanggal ramadhan
        Permission::create(['name' => 'tanggal_ramadhan.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'tanggal_ramadhan.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'tanggal_ramadhan.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'tanggal_ramadhan.delete', 'guard_name' => 'web']);
    }
}
