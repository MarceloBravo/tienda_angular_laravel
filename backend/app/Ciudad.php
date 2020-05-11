<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ciudad extends Model
{
    use SoftDeletes;

    protected $table = 'ciudades';

    protected $fillable = ['nombre', 'comuna_id'];

    public function comuna()
    {
        return $this->belongsTo('App\Comuna')->get();   //Muchos a uno
    }

    public function usuarios()
    {
        return $this->hasMany('App\User','ciudad_id','id')->get();  //Uno a muchos
    }

    public function empresa(){
        return $this->hasMany('App\Empresa','ciudad_id','id')->get();   //Uno a muchos
    }
}
