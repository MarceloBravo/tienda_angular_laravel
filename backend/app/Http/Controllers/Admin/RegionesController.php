<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Region;

class RegionesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $region = Region::all();

        return response()->json($region->ToArray());
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
        $region = new Region();
        $result = $region->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Error al intentar ingresar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $nuevoId = $result ? $region->id : -1;

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
        $region = Region::find($id);

        return response()->json($region);
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
        $region = Region::find($id);
        $result = $region->fill($request->all())->save();
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
        $region = Region::find($id);
        $result = $region->delete();
        $mensaje = $region ? "El registro ha sido eliminado." : "Ocurrio un error al intentar eliminar el registro.";
        $tipoMensaje = $region ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }


    public function filtrar($filtro)
    {
        if(is_null($filtro) || $filtro == "")
        {
            $regiones = Region::all();
        }else{
            $regiones = Region::join("paises","regiones.pais_id","=","paises.id")
                                ->where("pais_id","=",$filtro)
                                ->orWhere("regiones.nombre","Like","%".$filtro."%")
                                ->orWhere("paises.nombre","Like","%".$filtro."%")
                                ->select("regiones.*")
                                ->get();
        }

        return response()->json($regiones->ToArray());
    }

    //Retorna el listado en formato JSON con las regiones que pertenecen al pais del id recibido
    public function regionesPais($idPais){
        if(is_null($idPais) || $idPais == "")
        {
            $regiones = Region::all();
        }else{
            $regiones = Region::join("paises","regiones.pais_id","=","paises.id")
                                ->where("pais_id","=",$idPais)
                                ->select("regiones.*","paises.nombre as pais")
                                ->get();
        }

        return response()->json($regiones->ToArray());
    }
}
