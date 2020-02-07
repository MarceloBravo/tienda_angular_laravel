<?php

use Illuminate\Database\Seeder;
use App\Empresa;

class EmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Empresa::insert([
            'rut' =>'33.333.333-3',
            'nombre'=> 'ESSENCE LTDA.',
            'direccion'=> '1 Sur 14 Oriente #12345',
            'ciudad_id' => 32,
            'fono' => '123456789',
            'email' =>'ejemplo@essence.cl',
            'giro' => 'Venta de ropa y artículos electrónicos',
            'logo' => null,
            'created_at' => Date('Y-m-d'),
            'updated_at' => Date('Y-m-d'),
            'deleted_at' => null,
        ]);
    }
}
