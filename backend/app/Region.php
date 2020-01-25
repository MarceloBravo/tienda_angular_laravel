<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Region extends Model
{
    use SoftDeletes;

    protected $table = 'Regiones';

    protected $fillable = ['nombre', 'pais_id'];

    public function pais()
    {
        return $this->belongsTo('App\Pais')->get();
    }

    public function provincias()
    {
        return $this->hasMany('App\Provincia')->get();
    }
}
