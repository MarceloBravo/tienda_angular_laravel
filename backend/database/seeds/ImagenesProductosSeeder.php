<?php

use Illuminate\Database\Seeder;
use App\ImagenesProducto;

class ImagenesProductosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ImagenesProducto::insert([
            'producto_id' => 1,
            'url' => 'img/1',
            'nombre_archivo' => 'product01.png', 
            'default' => true,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 1,
            'url' => 'img/1',
            'nombre_archivo' => 'product06.png', 
            'default' => false,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 1,
            'url' => 'img/1',
            'nombre_archivo' => 'product07.png', 
            'default' => false,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 1,
            'url' => 'img/1',
            'nombre_archivo' => 'product08.png', 
            'default' => false,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 1,
            'url' => 'img/1',
            'nombre_archivo' => 'product09.png', 
            'default' => false,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 2,
            'url' => 'img/2',
            'nombre_archivo' => 'product04.png', 
            'default' => true,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 3,
            'url' => 'img/3',
            'nombre_archivo' => 'product03.png', 
            'default' => true,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 4,
            'url' => 'img/4',
            'nombre_archivo' => 'product05.png', 
            'default' => true,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 5,
            'url' => 'img/5',
            'nombre_archivo' => 'product03.png', 
            'default' => true,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);
           
        ImagenesProducto::insert([
            'producto_id' => 6,
            'url' => 'img/6',
            'nombre_archivo' => 'product06.png', 
            'default' => true,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 7,
            'url' => 'img/7',
            'nombre_archivo' => 'product07.png', 
            'default' => true,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 8,
            'url' => 'img/8',
            'nombre_archivo' => 'product08.png', 
            'default' => true,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);

        ImagenesProducto::insert([
            'producto_id' => 8,
            'url' => 'img/8',
            'nombre_archivo' => 'shop02.png', 
            'default' => false,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d')
        ]);
    }
}
