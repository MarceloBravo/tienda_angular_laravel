<?php

use Illuminate\Database\Seeder;
use App\Estado;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Estado::insert([
            "nombre" => "Pendiente",
            "estado_inicial" => 1,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);

        Estado::insert([
            "nombre" => "En preparación",
            "estado_inicial" => 0,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);

        Estado::insert([
            "nombre" => "Enviado",
            "estado_inicial" => 0,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);

        Estado::insert([
            "nombre" => "Finalizada",
            "estado_inicial" => 0,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d")
        ]);


    }
}
