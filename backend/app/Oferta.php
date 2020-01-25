<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Oferta extends Model
{
    use SoftDeletes;

    protected $table = "ofertas";

    protected $fillable = ["producto_id", "src_imagen", "texto1", "texto2", "fecha_expiracion", "portada"];

    public function prductos()
    {
        return $this->belongsTo("App\\Producto", "id")->get();
    }
}
