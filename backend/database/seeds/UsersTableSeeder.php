<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::Insert([
            'rut' =>  "44.444.444-4",
            'nombre' =>  "Perico",
            'a_paterno' =>  "Perez",
            'a_materno' =>  "Pereira",
            'email' =>  "prueba@ejemplo.cl",
            'email_verified_at' =>  null,
            'nickname' =>  "admin",
            'direccion' =>  "1 Oriente 5 Norte",
            'fono' =>  "987654321",
            'created_at' =>  Date('Y-m-d'),
            'updated_at' =>  Date('Y-m-d'),
            'deleted_at' =>  null,
            'rol_id' =>  1,
            'password' => bcrypt('123456'),
            'ciudad_id' => 32
        ]);
    }
}
