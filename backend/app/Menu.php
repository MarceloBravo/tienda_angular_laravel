<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    protected $table = 'menus';

    protected $fillable = ['nombre','icono_fa_class','menu_padre_id','posicion','pantalla_id','url'];

    public function pantalla(){
        return $this->hasOne('App\Pantalla','id','pantalla_id')->get();
    }
}
