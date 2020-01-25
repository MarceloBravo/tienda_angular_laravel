<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Provincia extends Model
{
    use SoftDeletes;

    protected $table = 'Provincias';

    protected $fillable = ['nombre', 'region_id'];

    public function region()
    {
        return $this->belongsTo('App\Region')->get();
    }

    public function comunas()
    {
        return $this->hasMany('App\Comuna')->get();
    }
}
