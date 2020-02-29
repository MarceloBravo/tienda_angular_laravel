<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permiso extends Model
{
    use SoftDeletes;

    protected $table = 'permisos';

    protected $fillable=['rol_id','pantalla_id','acceder','crear','actualizar','eliminar'];

    public function roles(){
        return $this->belongsTo('App\Rol','id','rol_id')->get();
    }
}
