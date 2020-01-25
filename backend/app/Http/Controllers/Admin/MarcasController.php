<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Marca;
use Validator;

class MarcasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $marcas = Marca::all();

        return response()->json($marcas->ToArray());
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
        $validator = $this->validaDatos($request,  null);
        if($validator->fails())
        {
            return response()->json(["mensaje"=>"Datos no válidos o incompletos:", "errores"=> $validator->errors()]);
        }

        $marca = new Marca();
        $result = $marca->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrió un error al intentar ingresar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $id = $result ? $marca->id : -1;

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje, "id"=>$id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $marca =  Marca::find($id);

        return response()->json($marca);
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
        $validator = $this->validaDatos($request,  $id);
        if($validator->fails())
        {
            return response()->json(["mensaje"=>"Datos no válidos o incompletos:", "errores"=> $validator->errors()]);
        }

        $marca = Marca::find($id);
        $result = $marca->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido actualizado." : "Ocurrión un error al intentar actualizar el registro.";
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
        $marca = Marca::find($id);
        $result = $marca->delete();
        $mensaje = $result ? "El registro ha sido eliminado." : "Ocurrión un error al intentar eliminar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }

    public function filtrar($filtro)
    {
        if(!isset($filtro) || $filtro == "")
        {
            $marcas = Marca::all();
        }else{
            $marcas = Marca::where("nombre","Like","%".$filtro."%")
                            ->select("marcas.*")
                            ->get();
        }

        return response()->json($marcas->ToArray());
    }

    protected function validaDatos(Request $request, $id)
    {
        $rules = [
            "nombre" => "required|min:2|max:50|unique:marcas,nombre,".$id
        ];

        $messages = [
            "nombre.required" => "El nombre de la marca es obligatorio.",
            "nombre.min" => "El nombre de la marca debe tener un mínimo de 2 carácteres. Ingresa un nombre más largo.",
            "nombre.max" => "El nombre de la marca debe tener un máximo de 50 carácteres. Ingresa un nombre más corto.",
            "nombre.unique" => "El nombre de la marca ya se encuentra registrado. Ingresa un nombre diferente."
        ];

        return Validator::make($request->all(), $rules, $messages);
    }
}
