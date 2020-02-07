<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empresa extends Model
{
    use SoftDeletes;
    
    protected $table = 'empresa';
    
    protected $fillable = ['rut', 'nombre', 'direccion', 'ciudad_id', 'fono', 'email','giro', 'logo'];

    public function ciudad(){
        return $this->hasOne('App\Ciudad','id','ciudad_id')->get();
        //return $this->hasOne('App\Ciudad::class');
    }
}