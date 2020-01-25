<?php

use Illuminate\Database\Seeder;
use App\Provincia;

class ProvinciasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Provincia::insert([
            'nombre' => 'Iquique',
            'region_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Tamarugal',
            'region_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Antofagasta',
            'region_id' => 2,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'El Loa',
            'region_id' => 2,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Tocopilla',
            'region_id' => 2,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Chañaral',
            'region_id' => 3,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Copiapó',
            'region_id' => 3,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Huasco',
            'region_id' => 3,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Choapa',
            'region_id' => 4,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Elqui',
            'region_id' => 4,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Limarí',
            'region_id' => 4,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Isla de Pascua',
            'region_id' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Los Andes',
            'region_id' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Marga Marga',
            'region_id' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Petorca',
            'region_id' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Quillota',
            'region_id' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'San Antonio',
            'region_id' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'San Felipe de Aconcagua',
            'region_id' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
            
        Provincia::insert([
            'nombre' => 'Valparaiso',
            'region_id' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Cachapoal',
            'region_id' => 6,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Cardenal Caro',
            'region_id' => 6,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Colchagua',
            'region_id' => 6,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([ //20
            'nombre' => 'Cauquenes',
            'region_id' => 7,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Curicó',
            'region_id' => 7,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Linares',
            'region_id' => 7,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Talca',
            'region_id' => 7,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Arauco',
            'region_id' => 8,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Biobío',
            'region_id' => 8,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Concepción',
            'region_id' => 8,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Cautín',
            'region_id' => 9,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Malleco',
            'region_id' => 9,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Chiloe',
            'region_id' => 10,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Llanquihue',
            'region_id' => 10,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Osorno',
            'region_id' => 10,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Palena',
            'region_id' => 10,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Aysén',
            'region_id' => 11,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Capitán Pratt',
            'region_id' => 11,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Coyhaique',
            'region_id' => 11,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'General Carrera',
            'region_id' => 11,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Antártica Chilena',
            'region_id' => 12,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Magallanes',
            'region_id' => 12,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Tierra del Fuego',
            'region_id' => 12,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Ultima Esperanza',
            'region_id' => 12,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([ //45
            'nombre' => 'Chacabuco',
            'region_id' => 13,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Cordillera',
            'region_id' => 13,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Maipo',
            'region_id' => 13,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Melipilla',
            'region_id' => 13,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([ //49
            'nombre' => 'Santiago',
            'region_id' => 13,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Talagante',
            'region_id' => 13,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Ranco',
            'region_id' => 14,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Valdivia',
            'region_id' => 14,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Arica',
            'region_id' => 15,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Parinacota',
            'region_id' => 15,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Diguillín',
            'region_id' => 16,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Itata',
            'region_id' => 16,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        Provincia::insert([
            'nombre' => 'Punilla',
            'region_id' => 16,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
    }
}
