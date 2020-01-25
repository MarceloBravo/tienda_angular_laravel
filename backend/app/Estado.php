<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estado extends Model
{
    use SoftDeletes;
    
    protected $table = "estados";

    protected $fillable = ["nombre", "estado_inicial"];
}
