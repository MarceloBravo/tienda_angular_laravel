<?php

use Illuminate\Database\Seeder;
use App\Marca;

class MarcasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Marca::insert([
            "nombre" => "Adidas",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);
        
        Marca::insert([
            "nombre" => "Under Armour",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Marca::insert([
            "nombre" => "Puma",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Marca::insert([
            "nombre" => "Frata",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Marca::insert([
            "nombre" => "Index",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Marca::insert([
            "nombre" => "UlSport",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Marca::insert([
            "nombre" => "Street Clotes",
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);


    }
}
