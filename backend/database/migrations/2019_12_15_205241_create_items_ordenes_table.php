<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsOrdenesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items_ordenes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('orden_id')->unsigned();
            $table->foreign('orden_id')->references('id')->on('ordenes');
            $table->bigInteger('producto_id')->unsigned();
            $table->foreign('producto_id')->references('id')->on('productos');
            $table->integer('precio')->unsigned();
            $table->integer('precio_anterior')->unsigned();
            $table->integer('cantidad')->unsigned();
            $table->integer('descuento')->unsigned();
            $table->string('token', 255)->nullable();
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
        Schema::dropIfExists('items_ordenes');
    }
}
