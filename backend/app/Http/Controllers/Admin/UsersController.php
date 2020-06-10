<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Validator;
use App\Rules\ValidaRut;

class UsersController extends Controller
{
    private $rowsByPage = 10;

    public function __construct(){
    //    $this->middleware('jwt', ['except' => ['login']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($pag = 0)
    {
        $allReg = User::join('roles','users.rol_id','=','roles.id')
                    ->join('ciudades','users.ciudad_id','=','ciudades.id')
                    ->select('users.*','roles.nombre as rol','ciudades.nombre as ciudad');
                    
        $countReg = count($allReg->get());

        $users = $allReg->skip($this->rowsByPage * $pag)
                        ->take($this->rowsByPage)
                        ->get();

        return response()->json(['data' => $users->ToArray(), 'rows' => $countReg , 'rowsByPage' => $this->rowsByPage]);
    }


    public function getAll(){
        $users = User::join('roles','users.rol_id','=','roles.id')
                    ->join('ciudades','users.ciudad_id','=','ciudades.id')
                    ->get();

        return response()->json($users);
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
        $validator = $this->validaCampos($request, false);
        if($validator->fails())
        {
            return response()->json(["mensaje"=>"Datos no válidos o incompletos:", "errores"=> $validator->errors(), "request"=>$request->all()]);
        }

        $user = new User();
        $result = $user->fill($request->all())->save();        
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrio un error al intentar ingresar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $id = $result ? $user->id : -1;

        return response()->json(["mensaje" => $mensaje, "tipo-mensaje"=>$tipoMensaje, "id"=>$id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::join('roles','users.rol_id','=','roles.id')
            ->join('ciudades','users.ciudad_id','=','ciudades.id')
            ->join('comunas','ciudades.comuna_id','=','comunas.id')
            ->join('provincias','comunas.provincia_id','=','provincias.id')
            ->join('regiones','provincias.region_id','=','regiones.id')
            ->join('paises','regiones.pais_id','=','paises.id')
            ->select(
                'users.*',
                'roles.nombre as rol',
                'ciudades.nombre as ciudad',
                'paises.id as pais_id',
                'regiones.id as region_id',
                'provincias.id as provincia_id',
                'comunas.id as comuna_id'
            )->find($id);
        
        return response()->json($user);
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
        $validator = $this->validaCampos($request, $id);
        if($validator->fails())
        {
            return response()->json(["mensaje"=>"Datos no válidos o incompletos:", "errores"=> $validator->errors()]);
        }

        $user = User::find($id);
        if($request->password != "")
        {
            $result = $user->fill($request->all())->save();
        }else{
            $result = $user->fill($request->except(["password"]))->save();
        }
        
        $mensaje = $result ? "El usuario ha sido actualizado." : "Ocurrio un error al intentar actualizar el usuario.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje" => $mensaje, "tipo-mensaje" => $tipoMensaje]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $result = $user->delete();
        $mensaje = $result ? "El usuario ha sido eliminado." : "Ocurrio un error al intentar eliminar el usuario.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje" => $mensaje, "tipo-mensaje" => $tipoMensaje]);
    }

    public function findEmail($email)
    {
        $user = User::join('roles','users.rol_id','=','roles.id')
                        ->join('ciudades','users.ciudad_id','=','ciudades.id')
                        ->where('users.email','Like','%'.$email.'%')
                        ->first();

        return response()->json($user);
    }


    public function filtrar($filtro, $pag)
    {
        if(!isset($filtro))
        {
            $allReg = User::join('roles','users.rol_id','=','roles.id')
                    ->join('ciudades','users.ciudad_id','=','ciudades.id')
                    ->select('users.*','roles.nombre as rol','ciudades.nombre as ciudad');    
        }else{
            $allReg = User::join("roles","users.rol_id","=","roles.id")
                            ->join("ciudades","users.ciudad_id","=","ciudades.id")
                            ->where("users.rut","Like","%".$filtro."%")
                            ->orWhere("users.nombre","Like","%".$filtro."%")
                            ->orWhere("users.a_paterno","Like","%".$filtro."%")
                            ->orWhere("users.a_materno","Like","%".$filtro."%")
                            ->orWhere("users.email","Like","%".$filtro."%")
                            ->orWhere("users.nickname","Like","%".$filtro."%")
                            ->orWhere("users.direccion","Like","%".$filtro."%")
                            ->orWhere("users.fono","Like","%".$filtro."%")
                            ->orWhere("roles.nombre","Like","%".$filtro."%")
                            ->orWhere("ciudades.nombre","Like","%".$filtro."%")
                            ->select("users.*", "roles.nombre as rol", "ciudades.nombre as ciudad");
        }

        $countReg = count($allReg->get());

        $users = $allReg->skip($this->rowsByPage * $pag)
                        ->take($this->rowsByPage)
                        ->get();

        return response()->json(['data' => $users->ToArray(), 'rows' => $countReg, 'rowsByPage' => $this->rowsByPage]);
    }



    
    // ************ Validaciones ******************//
    private function validaCampos(Request $request, $id = null)
    {
        $rules = [
            "rut" => ["required","min:9","max:13","unique:users,rut,".$id, new ValidaRut],
            "nombre" => "required|min:3|max:50",
            "a_paterno" => "required|min:3|max:50",
            "a_materno" => "required|min:3|max:50",
            "email" => "required|email|max:255|unique:users,email,".$id,
            "nickname" => "required|min:6|max:20",            
            "direccion" => "required|min:10|max:255",
            "fono" => "required|min:8|max:15",
            "rol_id" => "required|exists:roles,id",
            "ciudad_id" => "required|exists:ciudades,id",
        ];

        if(is_null($id))
        {   
            //Reglas de validación para usuarios nuevos (Contraseña y confirmación de contraseña son oblñigatorios)
            $rules += [
            "password" => "required|required_with:confirm_password|same:confirm_password|min:3|max:20|",
            "confirm_password" => "required|min:3|max:20"
            ];
        }else{
            //Reglas de validación para usuarios existentes (Contraseña y confirmación de contraseña son opcionales)
            $rules += [
                "password" => "nullable|required_with:confirm_password|same:confirm_password|min:3|max:20|",
                "confirm_password" => "nullable|min:3|max:20"
            ];
        }

        $messages = [
            "rut.required" => "Debe ingresar el rut del usuario.",
            "rut.min" => "El rut debe tener entre 9 y 15 carácteres. Ingresa un rut más largo.",
            "rut.max" => "El rut debe tener entre 9 y 15 carácteres. Ingresa un rut más corto.",
            "rut.unique" => "El rut ingresado ya se encuentra registrado. Ingresa un rut diferente.",

            "nombre.required" => "Debe ingresar el nombre del usuario.",
            "nombre.min" => "El nombre debe tener almenos 3 carácteres. Ingresa un nombre más largo.",
            "nombre.max" => "El nombre debe tener hasta de 50 carácteres. Ingresa un nombre más corto.",

            "a_paterno.required" => "Debe ingresar el apellido paterno del usuario.",
            "a_paterno.min" => "El apellido paterno debe tener almenos 3 carácteres. Ingresa un apellido más largo.",
            "a_paterno.max" => "El apellido paterno debe tener almenos 3 carácteres. Ingresa un apellido más corto.",

            "a_materno.required" => "Debe ingresar el apellido materno del usuario.",
            "a_materno.min" => "El apellido materno debe tener almenos 3 carácteres. Ingresa un apellido más largo.",
            "a_materno.max" => "El apellido materno debe tener almenos 3 carácteres. Ingresa un apellido más corto.",

            "email.required" => "Dwebe ingresar el email del usuario.",
            "email.email" => "El correo electrónico ingresado no es una dirección de email válida.",
            "email.max" => "El correo electrónico no debe sobrepasar los 255 carácteres. Ingresa un email más corto.",
            "email.unique" => "El correo electrónico ingresado ya se encuentra en uso. Ingresa un email diferente.",

            "nickname.required" => "El nickname es obligatorio.",
            "nickname.min" => "El nickname debe tener entre 6 y 20 carácteres. Ingresa un nickname más largo.",
            "nickname.max" => "El nickname debe tener entre 6 y 20 carácteres. Ingresa un nickname más corto.",

            "password.required" => "La contraseña del usuario es obligatoria.",
            "password.min" => "La contraseña debe tener entre 6 y 20 carácteres. Ingresa una contraseña más largo.",
            "password.max" => "La contraseña debe tener entre 6 y 20 carácteres. Ingresa una contraseña más corto.",
            "password.required_with" => "Debe ingresar la coinfirmación de contraseña.",
            "password.same" => "La contraseña y la confirmación de contraseña no coinciden",

            "direccion.required" => "Debe ingresar la dirección del usuario.",
            "direccion.min" => "La dirección del usuario debe tener entre 10 y 255 carácteres. Ingresa una dirección más largo.",
            "direccion.max" => "La dirección del usuario debe tener entre 10 y 255 carácteres. Ingresa una dirección más corto.",
            
            "fono.required" => "Debe ingresar el telefono del usuario.",
            "fono.min" => "El fono del usuario debe tener entre 8 y 15 carácteres. Ingresa un fono más largo.",
            "fono.max" => "El fono del usuario debe tener entre 8 y 15 carácteres. Ingresa un fono más corto.",

            "rol_id.required" => "Debe seleccionar el rol del usuario.",
            "rol_id.exists" => "El rol seleccionado no existe. Seleccione un rol válido",
            
            "ciudad_id.required" => "Debe seleccionar la ciudad del usuario.",
            "ciudad_id.exists" => "La ciudad seleccionada no existe. Seleccione una ciudad válida"
        ];
        
        return Validator::make($request->all(), $rules, $messages);     
    }
}
