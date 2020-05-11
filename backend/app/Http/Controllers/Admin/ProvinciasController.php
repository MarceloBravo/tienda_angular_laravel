<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Provincia;
use Validator;

class ProvinciasController extends Controller
{
    private $rowsByPage = 10;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($pag = 0)
    {
        $allProvincias = Provincia::join('regiones','provincias.region_id','=','regiones.id')
                                    ->join('paises','regiones.pais_id','=','paises.id')
                                    ->select('provincias.*','regiones.nombre as region','paises.nombre as pais')
                                    ->orderBy('paises.nombre', 'asc')
                                    ->orderBy('regiones.nombre','asc')
                                    ->orderBy('provincias.nombre','asc');
        $totFilas = count($allProvincias->get());
        
        $provincias = $allProvincias->skip($this->rowsByPage * $pag)
                                    ->take($this->rowsByPage)
                                    ->get();

        return response()->json(['data' => $provincias->ToArray(), 'rows'=>$totFilas, 'page' => $pag, 'rowsByPage'=>$this->rowsByPage]);
    }



    public function getAll(){
        $provincias = Provincia::all();

        return response()->json($provincias->toArray());
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
        $validacion = $this->validaCampos($request, null);
        if($validacion->fails()){
            return response()->json(['mensaje'=>'Campos incompletos o no válidos.','errores'=>$validacionCampos->errors()]);
        }

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
        $validacion = $this->validaCampos($request, $id);
        if($validacion->fails()){
            return response()->json(['mensaje'=>'Campos incompletos o no válidos.','errores'=>$validacionCampos->errors()]);
        }

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

    public function filtrar($filtro, $pag = 0)
    {
        
        if(is_null($filtro) || $filtro == "")
        {
            $allProvincias = Provincia::join('regiones','provincias.region_id','=','regiones.id')
                                    ->join('paises','regiones.pais_id','=','paises.id')                                    
                                    ->select('provincias.*','regiones.nombre as region','paises.nombre as pais')
                                    ->orderBy('paises.nombre', 'asc')
                                    ->orderBy('regiones.nombre','asc')
                                    ->orderBy('provincias.nombre','asc');
        }else{
            $allProvincias = Provincia::join('regiones','provincias.region_id','=','regiones.id')
                                        ->join('paises','regiones.pais_id','=','paises.id')                                        
                                        ->where("provincias.nombre", "Like", "%".$filtro."%")
                                        ->orWhere("regiones.nombre", "Like", "%".$filtro."%")
                                        ->orWhere("paises.nombre", "Like", "%".$filtro."%")
                                        ->select('provincias.*','regiones.nombre as region','paises.nombre as pais')
                                        ->orderBy('paises.nombre', 'asc')
                                        ->orderBy('regiones.nombre','asc')
                                        ->orderBy('provincias.nombre','asc');
        }

        $provincias = $allProvincias->skip($this->rowsByPage * $pag)
                                    ->take($this->rowsByPage)
                                    ->get();

        return response()->json(['data' => $provincias->ToArray(), 'rows' => count($allProvincias->get()), 'page' => $pag, 'rowsByPage'=>$this->rowsByPage]);
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



    private function validaCampos(Request $request, $id){

        $rules = [
            'nombre' => 'required|min:3|max:50|unique:provincias,id,'.$id,
            'region_id' => 'required|exists:regiones,id'
        ];

        $messages = [
            'nombre.required' => 'El nombre de la provincia es obligatorio.',
            'nombre.min' => 'El nombre debe tener almenos 3 carácteres. Ingresa un nombre más largo.',
            'nombre.max' => 'El nombre debe tener un máximo de 50 carácteres. Ingresa un nombre más corto.',
            'nombre.unique' => 'El nombre de la provincia ya se encuentra registrado. Ingresa un nombre diferente.',

            'region_id.required' => 'Debes seleccionar una región.',
            'region_id.exists' => 'La región seleccionada no existe o no es válida.'
        ];

        return Validator::make($request->all(), $rules, $messages);
    }
    
}
