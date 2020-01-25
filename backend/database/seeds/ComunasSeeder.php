<?php

use Illuminate\Database\Seeder;
use App\Comuna;

class ComunasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Comuna::insert([
            'nombre' => 'Colina',
            'provincia_id' => 45,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Comuna::insert([
            'nombre' => 'Puente Alto',
            'provincia_id' => 46,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Comuna::insert([
            'nombre' => 'San Bernardo',
            'provincia_id' => 47,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Comuna::insert([
            'nombre' => 'Melipilla',
            'provincia_id' => 48,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Comuna::insert([
            'nombre' => 'Santiago',
            'provincia_id' => 49,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Comuna::Insert([    //6
            'nombre' => 'Cauquenes',
            'provincia_id' => 23,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Comuna::Insert([    
            'nombre' => 'Curicó',
            'provincia_id' => 24,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Comuna::Insert([
            'nombre' => 'Linares',
            'provincia_id' => 25,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Comuna::Insert([
            'nombre' => 'Talca',
            'provincia_id' => 26,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
    }
}
