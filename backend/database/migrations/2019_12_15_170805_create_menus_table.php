<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre', 100)->unique();
            $table->string('icono_fa_class',50);
            $table->bigInteger('menu_padre_id')->unsigned();
            $table->integer('posicion')->unsigned();
            $table->bigInteger('pantalla_id')->unsigned();
            $table->foreign('pantalla_id')->references('id')->on('pantallas');
            $table->string('url', 255);            
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
        Schema::dropIfExists('menus');
    }
}
