<?php

use Illuminate\Database\Seeder;
use App\Categoria;

class CategoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Categoria::insert([
            "Nombre" => "Laptops",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
            ]);

        Categoria::insert([
            "Nombre" => "Audio y video",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
            ]);

        Categoria::insert([
            "Nombre" => "Camaras",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
            ]);

        Categoria::insert([
            "Nombre" => "Accesorios",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
            ]);

        Categoria::insert([
            "Nombre" => "Ofertas",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
            ]);
    }
}
