<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use SoftDeletes;

    protected $table = "productos";

    protected $fillable = ["nombre", "descripcion", "resumen", "slug", "categoria_id", "marca_id", "precio", 
                            "precio_anterior", "visible", "color", "nuevo", "oferta", "porcentaje_descuento"];
    
    public function ImagenesProducto()
    {
        return $this->HasMany("App\ImagenesProducto","producto_id", "id");
    }

    public function categoria()
    {
        return $this->belongsTo("App\Categoria","id")->get();
    }

    public function marca()
    {
        return $this->belongsTo("App\Marca", "id")->get();
    }

    public function ofertas()
    {
        return $this->hasMany("App\Oferta", "producto_id", "id")->get();
    }

    public function ItemOrden(){
        return $this->hasMany('App\ItemsOrden','producto_id','id')->get();
    }
}
