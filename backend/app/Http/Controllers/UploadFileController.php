<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repository;

class UploadFileController extends Controller
{
    public function upload(Request $request){
        $repositorio = new Repository();
        try{
            $archivo = $this->uploadFile($request->file("documento"), 'docs', true);
            $repositorio->archivo = $request->input("archivo");
            $repositorio->descripcion = $request->input("descripcion");
            $repositorio->ruta = $archivo;
            $repositorio->save();
            
            Session::flash("message-ok","El registro ha sido creado.");
        }catch(Exception $ex){
            Session::flash("message-error","Error al intentar crear el registro: ".$ex->getMessage());
        }

        //dd($request->file('file')->getClientOriginalName());
        return response()->json(['data'=>$request->file('file')->getClientOriginalName(), 'mensaje'=>'Recibido...']);
    }
}
