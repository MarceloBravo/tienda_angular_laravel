<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ImagenesProducto;

class ImagenesProductosController extends Controller
{

    //POST
    public function uploadFile(Request $request)
    {
        if($request->file("file") !== null){
            $repositorio = new ImagenesProducto();
            return $this->storeFile($repositorio, $request);
        }else{
            return response()->json(['mensaje' => 'No se han recibido archivos', 'tipo-mensaje' => 'danger']);
        }
    }



    //PUT
    public function UpdateFile(Request $request, $id)
    {
        if($request->file("file") !== null){
            $repositorio = ImagenesProducto::find($id);
            return $this->storeFile($repositorio, $request);
        }else{
            return response()->json(['mensaje' => 'No se han recibido archivos', 'tipo-mensaje' => 'danger']);
        }
    }


    private function storeFile($repositorio, Request $request){
        try{
            $archivo = $this->uploadFile($request->file('file'), 'docs', true);
            
            if($archivo != ""){
                $repositorio->producto_id = $request['producto_id'];
                $repositorio->nombre_archivo = $request->file("file")->getClientOriginalName();
                $repositorio->url = $archivo;
            
                $res = $repositorio->save();
                if($archivo != "")
                $mensaje = $res ? "El archivo ha sido subido." : "Ocurrió un error al intentar subir el archivo.";
                $tipoMensaje = $res ? "success" : "danger";

                return response()->json(['mensaje' => $mensaje, 'ttipo-mensaje' => $tipoMensaje]);
            }else{
                return response()->json(['mensaje' => '', 'tipo-mensaje' => '']);
            }

        }catch(Exception $error){ 
            return response()->json(['mensaje' => 'Ocurrió un error al intentar subir el archivo: ' .$error->getMessage(), 'ttipo-mensaje' => 'danger']);
        }
    }
}
