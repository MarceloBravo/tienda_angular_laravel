<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Comuna;

class ComunasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comunas = Comuna::all();

        return response()->json($comunas->ToArray());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $comuna = new Comuna();
        $result = $comuna->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrio un error al intentar ingresar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $nuevoId = $result ? $comuna->id : -1;

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje, "id"=>$nuevoId]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comuna = Comuna::find($id);

        return response()->json($comuna);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $comuna = Comuna::find($id);
        $result = $comuna->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido actualizado." : "Ocurrio un error al intentar actualizar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comuna = Comuna::find($id);
        $result = $comuna->delete();
        $mensaje = $result ? "El registro ha sido eliminado." : "Ocurrio un error al intentar eliminar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }

    public function filtrar($filtro)
    {
        if(!isset($filtro) || $filtro == "")
        {
            $comunas = Comuna::all();
        }else{
            $comunas = Comuna::join("provincias","comunas.provincia_id","=","provincias.id")
                            ->join("regiones","provincias.region_id","=","regiones.id")
                            ->join("paises","regiones.pais_id","=","paises.id")
                            ->where("comunas.nombre","Like","%".$filtro."%")
                            ->orWhere("provincias.nombre","Like","%".$filtro."%")
                            ->orWhere("regiones.nombre","Like","%".$filtro."%")
                            ->orWhere("paises.nombre","Like","%".$filtro."%")
                            ->select(
                                "comunas.*",
                                "provincias.nombre as provincia", 
                                "provincias.region_id as region_id",
                                "regiones.nombre as region",
                                "regiones.pais_id as pais_id",
                                "paises.nombre as pais"
                            )
                            ->get();
        }

        return response()->json($comunas->ToArray());
    }

    //Retorna el listado en formato JSON con las comunas que pertenecen a la provincia del id recibido
    public function comunasProvincia($idProvincia){
        if(!isset($idProvincia) || $idProvincia == "")
        {
            $comunas = Comuna::all();
        }else{
            $comunas = Comuna::join("provincias","comunas.provincia_id","=","provincias.id")
                            ->join("regiones","provincias.region_id","=","regiones.id")
                            ->join("paises","regiones.pais_id","=","paises.id")
                            ->where("comunas.provincia_id","=",$idProvincia)
                            ->select(
                                "comunas.*",
                                "provincias.nombre as provincia", 
                                "provincias.region_id as region_id",
                                "regiones.nombre as region",
                                "regiones.pais_id as pais_id",
                                "paises.nombre as pais"
                            )
                            ->get();
        }

        return response()->json($comunas->ToArray());
    }
}
