<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\Models\User::create([
            'name' => 'Erlangga',
            'email' => 'erlanggaangga092@gmail.com',
            'password' => bcrypt('root')
        ]);

        $permissions = \Spatie\Permission\Models\Permission::all();
        $role = \Spatie\Permission\Models\Role::find(1);
        $role->syncPermissions($permissions);
        $user->assignRole($role);
    }
}
