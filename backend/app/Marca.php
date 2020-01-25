<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Marca extends Model
{
    use SoftDeletes;

    protected $table = 'marcas';

    protected $fillable = ['nombre'];
    
    public function productos()
    {
        return $this->hasMany("App\Producto", "marca_id", "id")->get();
    }
}
