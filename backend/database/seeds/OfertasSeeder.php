<?php

use Illuminate\Database\Seeder;
use App\Oferta;

class OfertasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Oferta::insert([
            "producto_id" => 1,
            "src_imagen" => "img/1/producto01.png",
            "texto1" => "Ultimas unidades",
            "texto2" => "Hasta agotar Stock",
            "fecha_expiracion" => date("Y-m-d"),
            "portada" => true,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);
        
        Oferta::insert([
            "producto_id" => 2,
            "src_imagen" => "img/2/producto04.png",
            "texto1" => "Ultimas unidades",
            "texto2" => "Hasta agotar Stock",
            "fecha_expiracion" => date("Y-m-d"),
            "portada" => true,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);

        Oferta::insert([
            "producto_id" => 3,
            "src_imagen" => "img/3/producto03.png",
            "texto1" => "Ultimas unidades",
            "texto2" => "Hasta agotar Stock",
            "fecha_expiracion" => date("Y-m-d"),
            "portada" => true,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);

        Oferta::insert([
            "producto_id" => 4,
            "src_imagen" => "img/4/producto05.png",
            "texto1" => "Ultimas unidades",
            "texto2" => "Hasta agotar Stock",
            "fecha_expiracion" => date("Y-m-d"),
            "portada" => true,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);
        
        Oferta::insert([
            "producto_id" => 5,
            "src_imagen" => "img/5/producto03.png",
            "texto1" => "Ultimas unidades",
            "texto2" => "Hasta agotar Stock",
            "fecha_expiracion" => date("Y-m-d"),
            "portada" => true,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);

    }
}
