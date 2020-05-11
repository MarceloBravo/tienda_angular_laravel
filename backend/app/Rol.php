<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rol extends Model
{
    use SoftDeletes;

    protected $table = "roles";

    protected $fillable = ["nombre", "descripcion","default"];

    public function usuarios()
    {
        return $this->hasMany('App\User','rol_id','id')->get();
    }

    public function permisos()
    {
        return $this->hasMany('App\Permiso','rol_id','id')->get();
    }
    
    
}
