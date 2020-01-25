<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categoria extends Model
{
    use SoftDeletes;

    protected $table = "categorias";

    protected $fillable = ["nombre"];

    public function productos()
    {
        return $this->hasMany("App\Producto", "categoria_id", "id")->get();
    }
}
