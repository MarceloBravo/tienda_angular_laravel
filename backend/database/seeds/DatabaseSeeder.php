<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        // $this->call(PaisesSeeder::class);
        // $this->call(RegionesSeeder::class);
        // $this->call(ProvinciasSeeder::class);
        // $this->call(ComunasSeeder::class);
        // $this->call(CiudadesSeeder::class);
        // $this->call(MarcasSeeder::class);
        // $this->call(EstadosSeeder::class);
        // $this->call(CategoriasSeeder::class);
        // $this->call(ProductosSeeder::class);
        // $this->call(ImagenesProductosSeeder::class);
        // $this->call(OfertasSeeder::class);
        $this->call(HomeConfigurationSeeder::class);
    }
}