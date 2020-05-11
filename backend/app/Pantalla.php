<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pantalla extends Model
{
    use SoftDeletes;

    protected $table =  'pantallas';
    
    protected $fillable = [
        'nombre', 'tabla', 'permite_crear', 'permite_editar', 'permite_eliminar'
    ];

    public function menu(){
        return $this->hasMany('App\Menu','pantalla_id','id')->get();
    }
}
