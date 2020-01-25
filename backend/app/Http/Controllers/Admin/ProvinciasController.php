<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Provincia;

class ProvinciasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $provincias = Provincia::all();
        
        return response()->json($provincias->ToArray());
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
        $provincia = new Provincia();
        $result = $provincia->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrio un error al intentar ingresar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $nuevoId = $result ? $provincia->id : -1;

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje, "id" => $nuevoId]);
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $provincia = Provincia::find($id);
        
        return response()->json($provincia);
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
        $provincia = Provincia::find($id);
        $result = $provincia->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrio un error al intentar actualizar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje,"tipo-mensaje"=>$tipoMensaje]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $provincia = Provincia::find($id);
        $result = $provincia->delete();
        $mensaje = $result ? "El registro ha sido eliminado." : "Ocurrio un error alñ intentar eliminar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }

    public function filtrar($filtro)
    {
        if(is_null($filtro) || $filtro == "")
        {
            $provincias = Provincia::all();
        }else{
            $provincias = Provincia::join("regiones","provincias.region_id","=","regiones.id")
                                    ->join("paises","regiones.pais_id","=","paises.id")
                                    ->where("provincias.nombre", "Like", "%".$filtro."%")
                                    ->orWhere("regiones.nombre", "Like", "%".$filtro."%")
                                    ->orWhere("paises.nombre", "Like", "%".$filtro."%")
                                    ->select("provincias.*","regiones.nombre as region","paises.id as pais_id", "paises.nombre as pais")
                                    ->get();
        }

        return response()->json($provincias->ToArray());
    }


    //Retorna el listado en formato JSON con las provincias que pertenecen a la región del id recibido
    public function provinciasRegion($idRegion){
        if(is_null($idRegion) || $idRegion == "")
        {
            $provincias = Provincia::all();
        }else{
            $provincias = Provincia::join("regiones","provincias.region_id","=","regiones.id")
                                    ->join("paises","regiones.pais_id","=","paises.id")
                                    ->where("provincias.region_id","=",$idRegion)
                                    ->select("provincias.*","regiones.nombre as region","paises.id as pais_id", "paises.nombre as pais")
                                    ->get();
        }

        return response()->json($provincias->ToArray());
    }


}
