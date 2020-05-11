<?php

use Illuminate\Database\Seeder;
use App\Rol;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Rol::insert([
            'nombre' => "Admin",
            'descripcion' => "Rol para el usuario administrador",
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d'),
            'deleted_at' => null,
            'default' => 0,
        ]);
        
        Rol::insert([
            'nombre' => "Cliente",
            'descripcion' => "Rol para el usuario cliente",
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d'),
            'deleted_at' => null,
            'default' => 0,
        ]);
    }
}
