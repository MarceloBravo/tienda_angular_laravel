<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableEmpresa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresa', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('rut', 13);
            $table->string('nombre', 100);
            $table->string('direccion',255);
            $table->bigInteger('ciudad_id')->unsigned();
            $table->foreign('ciudad_id')->references('id')->on('ciudades');
            $table->string('fono',20);
            $table->string('email',100);
            $table->string('logo',500)->nullable();
            $table->string('giro',500);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empresa');
    }
}
