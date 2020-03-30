<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Comuna;
use Validator;

class ComunasController extends Controller
{
    private $rowsByPage = 10;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($page = 0)
    {
        $allComunas = Comuna::join('provincias','comunas.provincia_id','=','provincias.id')
                                ->join('regiones','provincias.region_id','=','regiones.id')
                                ->join('paises','regiones.pais_id','=','paises.id')
                                ->select(
                                    "comunas.*",
                                    "provincias.nombre as provincia", 
                                    "provincias.region_id as region_id",
                                    "regiones.nombre as region",
                                    "regiones.pais_id as pais_id",
                                    "paises.nombre as pais"
                                )
                                ->orderBy('paises.nombre','asc')
                                ->orderBy('regiones.nombre','asc')
                                ->orderBy('provincias.nombre','asc')
                                ->orderBy('comunas.nombre','asc');
        
        $comunas = $allComunas->skip($this->rowsByPage * $page)
                                ->take($this->rowsByPage)
                                ->get();

        return response()->json(['data'=>$comunas->ToArray(), 'rows'=>count($allComunas->get()),'page'=>$page,'rowsByPage'=>$this->rowsByPage]);
    }

    public function getAll(){
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
        $validacion = $this->validaDatos($request, null);
        if($validacion->fails()){
            return response()->json(['mensaje'=>'Datos incompletos o no validos','errores'=>$validacion->errors()]);
        }
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
        
        $comuna = Comuna::join('provincias','comunas.provincia_id','=','provincias.id')
                            ->join('regiones','provincias.region_id','=','regiones.id')
                            ->join('paises','regiones.pais_id','=','paises.id')
                            ->select('comunas.*','regiones.id as region_id','paises.id as pais_id')
                            ->find($id);
        
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
        $validacion = $this->validaDatos($request, $id);
        if($validacion->fails()){
            return response()->json(['mensaje'=>'Datos incompletos o no validos','errores'=>$validacion->errors()]);
        }
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
    

    public function filtrar($filtro, $page = 0)
    {
        $allComunas = Comuna::join("provincias","comunas.provincia_id","=","provincias.id")
                            ->join("regiones","provincias.region_id","=","regiones.id")
                            ->join('paises','regiones.pais_id','=','paises.id');

        if(!isset($filtro) || $filtro == "")
        {
            $comunas = $allComunas->skip($this->rowsByPage * $page)
                                    ->take($this->rowsByPage)
                                    ->get();
        }else{
            $comunas = $allComunas->where("comunas.nombre","Like","%".$filtro."%")
                                ->orWhere("provincias.nombre","Like","%".$filtro."%")
                                ->orWhere("regiones.nombre","Like","%".$filtro."%")
                                ->orWhere("paises.nombre","Like","%".$filtro."%");                            
        }
        $comunas = $comunas->select(
                        "comunas.*",
                        "provincias.nombre as provincia", 
                        "provincias.region_id as region_id",
                        "regiones.nombre as region",
                        "regiones.pais_id as pais_id",
                        "paises.nombre as pais"
                    )
                    ->orderBy('paises.nombre','asc')
                    ->orderBy('regiones.nombre','asc')
                    ->orderBy('provincias.nombre','asc')
                    ->orderBy('comunas.nombre','asc')
                    ->get();

        return response()->json(['data'=>$comunas->ToArray(),'rows'=> count($allComunas->get()),'page'=>$page,'rowsByPage'=>$this->rowsByPage]);
    }

    //Retorna el listado en formato JSON con las comunas que pertenecen a la provincia del id recibido (Para llenar controles <Select>)
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



    private function validaDatos(Request $request, $id){
        $rules = [
            'nombre' => 'required|min:3|max:50|unique:comunas,id,'.$id,
            'provincia_id' => 'required|exists:provincias,id'
        ];

        $messages = [
            'nombre.required' => 'El nombre de la comuna es obligatorio.',
            'nombre.min' => 'El nombre debe tener un mínimo de 3 carácteres. Ingresa un nombre más largo.',
            'nombre.max' => 'El nombre debe tener un máximo de 50 carácteres. Ingresa un nombre más corto.',
            'nombre.unique' => 'El nombre de la comuna ya se encuentra registrado. Ingresa un nombre diferente.',

            'provincia_id.required' => 'Debe seleccionar una provincia.',
            'provincia_id.exists' => 'La provincia seleccionada no existe.'
        ];

        return Validator::make($request->toArray(), $rules, $messages);


    }
}
