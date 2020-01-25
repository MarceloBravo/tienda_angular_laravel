<?php

use Illuminate\Database\Seeder;
use App\Producto;

class ProductosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Producto::insert([
            "categoria_id" => 1,
            "Nombre" => "Notebook Asus AS-456",
            "slug" => "note-as-456",
            "descripcion" => "Notebook Asus Core I7 7a generación, 1 TB Hdd, 8 GB Ram, 1 HDMI, 1 VGA, 2 USB 2.0, 1 USB 3.0, DVD",
            "resumen" => "Notebook Asus Core I7, 1TB Hdd, 8GB Ram", 
            "precio" => 600000,
            "visible" => 1,
            "color" => "negro",
            "nuevo" => 1,
            "marca_id" => 1, 
            "oferta" => 0, 
            "precio_anterior" => 700000,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);
        
        Producto::insert([
            "categoria_id" => 1,
            "Nombre" => "Notebook Lenovo LNV123",
            "slug" => "note-lnv-123",
            "descripcion" => "Notebook Lenovo Core I7 8a generación, 1 TB Hdd, 8 GB Ram, 1 HDMI, 1 VGA, 2 USB 2.0, 1 USB 3.0",
            "resumen" => "Notebook Lenovo Core I7, 1TB Hdd, 8GB Ram", 
            "precio" => 700000,
            "visible" => 1,
            "color" => "Grid",
            "nuevo" => 1,
            "marca_id" => 2, 
            "oferta" => 0, 
            "precio_anterior" => 900000,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Producto::insert([
            "categoria_id" => 1,
            "Nombre" => "Notebook Samsung SS-123",
            "slug" => "Notebook Samsung SS-123",
            "descripcion" => "Notebook Samsung Core I7 8a generación, 1 TB Hdd, 6 GB Ram, 1 HDMI, 2 USB 3.0",
            "resumen" => "Notebook Lenovo Core I7, 1TB Hdd, 6GB Ram", 
            "precio" => 450000,
            "visible" => 1,
            "color" => "Negro",
            "nuevo" => 1,
            "marca_id" => 4, 
            "oferta" => 0, 
            "precio_anterior" => 550000,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Producto::insert([
            "categoria_id" => 1,
            "Nombre" => "Audifono Sony Sny-0101",
            "slug" => "Sny-0101",
            "descripcion" => "Audifono stero alámbrico con Sony con manos libres, aro para la cabeza, almoadillas de xx pulgadas, etc.",
            "resumen" => "Audifonos Stero Sony con manos libres Sny-0101", 
            "precio" => 15000,
            "visible" => 1,
            "color" => "Negro",
            "nuevo" => 1,
            "marca_id" => 3, 
            "oferta" => 0, 
            "precio_anterior" => 15000,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Producto::insert([
            "categoria_id" => 1,
            "Nombre" => "Notebook HP hp-0908K",
            "slug" => "note-hp-0908K",
            "descripcion" => "Notebook HP Core I7 8a generación, 1 TB Hdd, 6 GB Ram, 1 HDMI, 2 USB 3.0",
            "resumen" => "Notebook HP Core I7, 1TB Hdd, 6GB Ram", 
            "precio" => 550000,
            "visible" => 1,
            "color" => "Gris",
            "nuevo" => 1,
            "marca_id" => 5, 
            "oferta" => 0, 
            "precio_anterior" => 650000,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Producto::insert([
            "categoria_id" => 1,
            "Nombre" => "Macbook Pro mc-0123",
            "slug" => "mc-0123",
            "descripcion" => "Macbook pro, 1 TB Hdd, 6 GB Ram, 1 HDMI, 2 USB 3.0",
            "resumen" => "Maxkbook pro, 1 TB Hdd, 6 GB Ram, 1 HDMI, 2 USB 3.0", 
            "precio" => 600000,
            "visible" => 1,
            "color" => "Negro",
            "nuevo" => 1,
            "marca_id" => 7, 
            "oferta" => 0, 
            "precio_anterior" => 650000,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Producto::insert([
            "categoria_id" => 1,
            "Nombre" => "Celular Lg x-cam LG-K580F",
            "slug" => "LG-K580F",
            "descripcion" => "Celular Lg X-Cam, camara frontal y doble cámara trasera, 16 GB de memoria + Micro SD de hasta 16 GB, liberado.",
            "resumen" => "Celular Lg x-cam LG-K580F, 16 GB de almacenamiento +  camara frontal y trasera", 
            "precio" => 150000,
            "visible" => 1,
            "color" => "Negro",
            "nuevo" => 1,
            "marca_id" => 6, 
            "oferta" => 0, 
            "precio_anterior" => 200000,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);

        Producto::insert([
            "categoria_id" => 1,
            "Nombre" => "Cámara fotgrafica LG ph-12345",
            "slug" => "LG-ph-12345",
            "descripcion" => "Cámara fotografica LG, con gran angular, menmoria de 32 GB, función nocturna, etc.",
            "resumen" => "Cámara fotgrafica LG ph-12345, 32 Gb, Func. Nocturna", 
            "precio" => 250000,
            "visible" => 1,
            "color" => "Grid",
            "nuevo" => 1,
            "marca_id" => 6, 
            "oferta" => 0, 
            "precio_anterior" => 300000,
            "created_at" => date("Y-m-d"),
            "updated_at" => date("Y-m-d"),
        ]);


    }
}
