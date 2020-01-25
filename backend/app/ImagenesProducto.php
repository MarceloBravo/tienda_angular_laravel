<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImagenesProducto extends Model
{
    use SoftDeletes;

    protected $table = "imagenes_productos";

    protected $fillable = ["producto_id", "nombre_archivo", "url"];

    public function producto()
    {
        return $this->belongsTo("App\Producto","id")->get();
    }
}
