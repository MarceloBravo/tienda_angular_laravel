<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemsOrden extends Model
{
    use SoftDeletes;

    protected $table = 'items_ordenes';

    protected $fillable = ['orden_id','producto_id','precio','precio_anterior','cantidad','descuento'];

    public function orden(){
        return $this->hasOne('App\Orden','id','orden_id')->get();
    }

    public function producto(){
        return $this->hasOne('App\Producto','id','producto_id')->get();
    }

}
