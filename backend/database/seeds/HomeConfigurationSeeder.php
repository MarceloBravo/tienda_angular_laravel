<?php

use Illuminate\Database\Seeder;
use App\HomeConfiguration as HomeConfig;

class HomeConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        HomeConfig::insert([
            "imagen" => "img/bg-img/bg-1.jpg",
            "texto" => "Nueva colección",
            "texto2" => "El verano ya está aquí",
            "img_link" => "#",
            "texto_link" => "Ver colección",
            "seccion" => 1,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);

        
        HomeConfig::insert([
            "imagen" => "img/bg-img/c3.jpg",
            "texto" => "Con todo tu estilo",
            "texto2" => "Tenemos colecciones",
            "img_link" => null,
            "texto_link" => "Ir a...",
            "seccion" => 1,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);

        HomeConfig::insert([
            "imagen" => "img/bg-img/hotdeal.png",
            "texto" => "La mejor tecnología",
            "texto2" => "Encuentra aquí",
            "img_link" => "#",
            "texto_link" => "Ver tecnologia",
            "seccion" => 1,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);

        HomeConfig::insert([
            "imagen" => "img/bg-img/bg-5.jpg",
            "texto" => "Venta mundial",
            "texto2" => "",
            "img_link" => null,
            "texto_link" => "Ir a...",
            "seccion" => 2,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);
    }
}
