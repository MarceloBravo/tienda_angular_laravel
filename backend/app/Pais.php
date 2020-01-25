<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pais extends Model
{
    use SoftDeletes;

    protected $table = 'Paises';

    protected $fillable = ['nombre'];

    public function regiones()
    {
        return $this->hasMany('App\Region')->get();
    }
}
