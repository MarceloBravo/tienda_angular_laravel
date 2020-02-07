<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Exception;
use App\Producto;

trait CarritoTrait{

    //Total
    public function total()
    {
        $total = 0;   
        if(\Session::has('carrito'))
        {
            $carrito = \Session::get('carrito');        
            foreach($carrito as $item){
                $total += $item->precio * $item->cantidad;
            }
        }
        return $total;
    }

}