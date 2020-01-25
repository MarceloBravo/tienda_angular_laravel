<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comuna extends Model
{
    use SoftDeletes;

    protected $table = 'Comunas';

    protected $fillable = ['nombre', 'provincia_id'];

    public function provincia()
    {
        return $this->belongsTo('App\Provincia')->get();
    }

    public function ciudades()
    {
        return $this->hasMany('App\Ciudad')->get();
    }
}
