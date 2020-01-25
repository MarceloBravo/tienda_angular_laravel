<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHomeConfigurationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('home_configuration', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('imagen',500);
            $table->string('texto',100)->default("");
            $table->string('texto2',100)->default("");
            $table->string('img_link',255)->nullable();
            $table->string('texto_link', 20)->default("Ir a..");
            $table->integer('seccion')->unsigned();
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
        Schema::dropIfExists('home_configuration');
    }
}
