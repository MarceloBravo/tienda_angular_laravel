<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Rol;
use Validator;
use DB;
use \App\Exceptions\CustomException;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Rol::all();

        return response()->json($roles->ToArray());
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
        //Validación de datos
        $validator = $this->validaCampos($request); //Validando campos
        if($validator->fails())
        {
            return response()->json(["mensaje"=>"Datos no válidos o incompletos:", "errores"=> $validator->errors()]);  //Retornando el mensaje de error
        }

        //Creando el registro
        $rol = new Rol();
        $result = $rol->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrio un error al intentar ingresar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $nuevoId = $result ? $rol->id : -1;

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
        $rol = Rol::find($id);

        return response()->json($rol);
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
            return $this->messagesErrors("Datos no válidos o incompletos.", $validator->errors());  //Retornando el mensaje de error
        }

        try
        {
            DB:transaction();
            $rol = Rol::find($id);
            $result = $rol->fill($request->all())->save();
            

            if($result){
                $res = Rol::where("default","=",false)->where("id","<>",$id)->update(["default"=>false]);
            }
            if($res){
                DB::commit();            
                $mensaje = $result ? "El registro ha sido actualizado." : "Ocurrio un error al intentar actualizar el registro.";
                $tipoMensaje = $result ? "success" : "danger";
            }else{
                DB::rollback();
                throw new CustomException("Error al configurar el registro por default.");                
            }
            
        }catch(Exception $ex){
            $mensaje = "Ocurrio un error al intentar actualizar el registro por default: ".$ex.getMessage();
            $tipoMensaje = "danger";
            DB::rollback();
        }
        

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
        $rol = Rol::find($id);
        $result = $rol->delete();
        $mensaje = $result ? "El registro ha sido eliminado." : "Ocurrio un error al intentar eliminar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }

    public function filtrar($filtro)
    {
        
        if(!isset($filtro) || $filtro == "")
        {
            $roles = Roll::all();
        }else{
            $roles = Rol::where("nombre","Like","%".$filtro."%")
                        ->orWhere("descripcion","Like","%".$filtro."%")
                        ->select("roles.*")
                        ->get();
        }

        return response()->json($roles->ToArray());
    }


    //Creando las reglas de validación, mensajes asociados a cada campo y validando los campos
    private function validaCampos($request)
    {
        $rules = [
            "nombre" => "required|min:3|max:50|unique:roles,nombre,".$request->id,
            "descripcion" => "required|min:3|max:255"
        ];

        $messages = [
            "nombre.required" => "El nombre del rol es obligatorio.",
            "nombre.min" => "El nombre del rol debe tener un mínimo de 3 carácteres. Ingresa un nombre más largo.",
            "nombre.max" => "El nombre del rol debe tener un máximo de 50 carácteres. Ingresa un nombre más corto.",
            "nombre.unique" => "El nombre del rol ya existe. Ingresa un nombre diferente.",

            "descripcion.required" => "La descripción del rol es obligatoria.",
            "descripcion.min" => "La descripción del rol debe tener un mínimo de 3 carácteres. Ingresa una descripción más larga.",
            "descripcion.max" => "La descripción del rol debe tener un máximo de 255 carácteres. Ingresa una descripción más corta."
        ];

        return Validator::make($request->all(), $rules, $messages);
    }


    //Generando el mensaje de error a devoilver al usuario
    private function messagesErrors($error, $errorMessages = [], $code = 404)
    {
        $response = [
            "success" => false,
            "message" => $error
        ];

        if(!empty($errorMessages))
        {
            $response["data"] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    public function getDefaultRol()
    {
        $rol = Rol::where("default","=",true)->first();

        return response()->json($rol);
    }
}
