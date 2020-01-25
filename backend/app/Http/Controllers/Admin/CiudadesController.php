<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Ciudad;
use Validator;

class CiudadesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ciudades = Ciudad::join("comunas", "ciudades.comuna_id","=","comunas.id")
                            ->join("provincias", "comunas.provincia_id", "=", "provincias.id")
                            ->join("regiones", "provincias.region_id", "=", "regiones.id")
                            ->join("paises", "regiones.pais_id", "=", "paises.id")                            
                            ->select("ciudades.*","comunas.nombre as comuna","provincias.nombre as provincia","regiones.nombre as region","paises.nombre as pais")
                            ->get();

        return response()->json($ciudades->ToArray());
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
        $validator = $this->validaCampos($request);

        if($validator->fails())
        {
            return $this->messagesErrors("Error de datos ",$validator->errors());
        }


        $ciudad = new Ciudad();
        $result = $ciudad->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrio un error al intentar ingresar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $nuevoId = $result ? $ciudad->id : -1;

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
        $ciudad = Ciudad::find($id);

        return response()->json($ciudad);
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
        $validator = $this->validaCampos($request);

        if($validator->fails())
        {
            return $this->messagesErrors("Error de datos ",$validator->errors());
        }

        $ciudad = Ciudad::find($id);
        $result = $ciudad->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido actualizadio." : "Ocurrio un error al intentar actualizar el registro.";
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
        $ciudad = Ciudad::find($id);
        $result = $ciudad->delete();
        $mensaje = $result ? "El registro ha sido eliminado." : "Ocurrio un error al intentar eliminar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }

    public function filtrar($filtro)
    {
        if(!isset($filtro) || $filtro == "")
        {
            $ciudades = Ciudad::all();
        }else{
            $ciudades = Ciudad::join("comunas", "ciudades.comuna_id","=","comunas.id")
                            ->join("provincias", "comunas.provincia_id", "=", "provincias.id")
                            ->join("regiones", "provincias.region_id", "=", "regiones.id")
                            ->join("paises", "regiones.pais_id", "=", "paises.id")
                            ->where("ciudades.nombre", "Like", "%".$filtro."%")
                            ->orWhere("comunas.nombre", "Like", "%".$filtro."%")
                            ->orWhere("provincias.nombre", "Like", "%".$filtro."%")
                            ->orWhere("regiones.nombre", "Like", "%".$filtro."%")
                            ->orWhere("paises.nombre", "Like", "%".$filtro."%")
                            ->select("ciudades.*","comunas.nombre as comuna","provincias.nombre as provincia","regiones.nombre as region","paises.nombre as pais")
                            ->get();
        }

        return response()->json($ciudades);
    }

    public function ciudadesComuna($idComuna){
        if(!isset($idComuna) || $idComuna == "")
        {
            $ciudades = Ciudad::all();
        }else{
            $ciudades = Ciudad::join("comunas", "ciudades.comuna_id","=","comunas.id")
                            ->join("provincias", "comunas.provincia_id", "=", "provincias.id")
                            ->join("regiones", "provincias.region_id", "=", "regiones.id")
                            ->join("paises", "regiones.pais_id", "=", "paises.id")
                            ->where("ciudades.comuna_id", "=", $idComuna)
                            ->select("ciudades.*","comunas.nombre as comuna","provincias.nombre as provincia","regiones.nombre as region","paises.nombre as pais")
                            ->get();
        }

        return response()->json($ciudades);
    }



    
    private function validaCampos(Request $request)
    {
        $rules = [
            "nombre" => "required|min:3|max:50|unique:ciudades,id,".$request->id,
            "comuna_id" => "required|exists:comunas,id"
        ];

        $messages = [
            "nombre.required" => "El nombre de la ciudad es obligatorio.",
            "nombre.min" => "El nombre de la ciudad debe tener un mínimo de 3 carácteres. Ingrese un nombre mas largo.",
            "nombre.max" => "El nombre de la ciudad debe tener un máximo de 50 carácteres. Ingrese un nombre mas corto.",
            "nombre.unique" => "El nombre de la ciudad ya ha sido ingresado. Ingresa un nombre diferente.",

            "comuna_id.required" => "Debe seleccionar una comuna.",
            "comuna_id.exists" => "La comuna seleccionada no es válida o no existe."
        ];

        return Validator::make($request->all(),$rules, $messages);
    }


    private function messagesErrors($error, $errorMessage = [], $code = 404)
    {
        $response = [
            "success" => false,
            "message" => $error
        ];

        if(!empty($errorMessage))
        {
            $response["data"] = $errorMessage;
        }

        return response()->json($response, $code);
    }
}
