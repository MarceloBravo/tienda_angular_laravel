<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Orden extends Model
{
    use SoftDeletes;

    protected $table = 'ordenes';

    protected $fillable = ['subtotal','shipping','descuento','user_id','estado_id','tipo_documento','token'];

    public function usuarios(){
        return $this->hasOne('App\user','id','user_id')->get();
    }

    public function Items(){
        return $this->hasMany('App\ItemsOrden','orden_id','id')->get();
    }
}
