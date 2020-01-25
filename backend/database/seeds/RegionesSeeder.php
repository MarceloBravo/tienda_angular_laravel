<?php

use Illuminate\Database\Seeder;
use App\Region;

class RegionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Region::insert([
            'nombre' => 'I de Tarapaca',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'II de Antofagasta',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'III de Atacama',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'IV de Coquimbo',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'V de Valparaiso',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => "VI del Libertador General Bernardo O'Higgins",
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'VII del Maule',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'VIII del Biobío',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'IX de la Araucanía',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'X de los Lagos',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'XI de Aysen del General Carlos Ibañez del Campo',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'XII de Magallanes y la Antártica Chilena',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'Metropolitana de Santiago',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'XIV de los Rios',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'XV de Arica y Parinacota',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Region::insert([
            'nombre' => 'XVI de Ñuble',
            'pais_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
    }
}
