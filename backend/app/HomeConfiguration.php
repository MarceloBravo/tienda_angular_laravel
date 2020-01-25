<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HomeConfiguration extends Model
{
    use SoftDeletes;

    protected $table = "home_configuration";

    protected $fillable = ["imagen", "texto", "seccion"];
}
