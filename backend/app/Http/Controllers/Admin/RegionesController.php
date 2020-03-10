<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Region;
use App\Pais;
use Validator;

class RegionesController extends Controller
{
    private $rowsByPage = 10;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($pag = 0)
    {
        $allRegiones = Region::join('paises','regiones.pais_id','=','paises.id')
                                ->select('regiones.*','paises.nombre as pais')
                                ->orderBy('regiones.nombre','asc');

        $regiones = $allRegiones->skip($this->rowsByPage * $pag)
                                ->take($this->rowsByPage)
                                ->get();

        return response()->json(['data'=>$regiones->ToArray(),'rows'=>count($allRegiones->get()),'page'=>$pag,'rowsByPage'=>$this->rowsByPage]);
    }


    public function getAll(){
        $regiones = Region::all();

        return response()->json($regiones);
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
        $validacion = $this->validaDatos($request);
        if($validacion->fails()){
            return response()->json(['mensaje'=>'Datos incompletos o no válidos','errores'=>$validacion->errors()]);
        }

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
        $validacion = $this->validaDatos($request, $id);
        if($validacion->fails()){
            return response()->json(['mensaje'=>'Datos incompletos o no válidos','errores'=>$validacion->errors()]);
        }

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


    public function filtrar($filtro, $pag = 0)
    {
        if(is_null($filtro) || $filtro == "")
        {
            $allRegiones = Region::join('paises','regiones.pais_id','=','paises.id')
                            ->select('regiones.*','paises.nombre as pais')
                            ->orderBy('paises.nombre','Asc')
                            ->orderBy('regiones.nombre','Asc');
        }else{
            $allRegiones = Region::join("paises","regiones.pais_id","=","paises.id")
                                ->where("pais_id","=",$filtro)
                                ->orWhere("regiones.nombre","Like","%".$filtro."%")
                                ->orWhere("paises.nombre","Like","%".$filtro."%")
                                ->select("regiones.*","paises.nombre as pais");
        }

        $regiones = $allRegiones->skip($this->rowsByPage * $pag)
                                    ->take($this->rowsByPage)
                                    ->get();

        return response()->json(['data'=>$regiones->ToArray(),'rows'=>count($allRegiones->get()),'page'=>$pag,'rowsByPage'=>$this->rowsByPage]);
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


    private function validaDatos(Request $request, $id = null){
        $rules = [
            'nombre'=>'required|min:3|max:50|unique:regiones,id,'.$id,
            'pais_id' => 'required|exists:paises,id'
        ];

        $messages = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.min' => 'El campo nombre debe tener almenos 3 carácteres. Ingresa un nombre mas largo.',
            'nombre.max' => 'El campo nombre debe tener un máximo 50 carácteres.Ingresa un nombre mas corto.',
            'nombre.unique' => 'El nombre ingresado ya se encuentra en uso. Ingresa un nombre diferente.'
        ];

        return Validator::make($request->all(), $rules, $messages);
    }
}
