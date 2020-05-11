<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Permiso;
use App\Pantalla;
use DB;
use Validator;
use Exception;

class PermisosController extends Controller
{
    private $rowsByPage = 0;    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($page = 0)
    {
        $allPermisos = Permiso::join('roles','permisos.rol_id','=','roles.id')
                            ->select('permisos.*','roles.nombre as rol')
                            ->orderBy('roles.nombre','asc');

        $cantReg = count($allPermisos->get());

        $permisos = $allPermisos->skip($this->rowsByPage * $page)
                                ->take($this->rowsByPage)
                                ->get();

        return response()->json(['data' => $permisos->toArray(), 'rows' => $cantReg, 'rows' => $page, 'rowsByPage' => $this->rowsByPage]);
    }


    public function getAll()
    {
        $permisos = Permiso::all();

        return response()->json($permisos->toArray());
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
        DB::beginTransaction();
        try{
            foreach($request->toArray() as $item){
                
                $permiso = Permiso::find($item['id']);
                if(is_null($permiso)){
                    $permiso = new Permiso();
                }
                $permiso->fill($item);
                //return response()->json($permiso->toArray());
                if(!$this->grabar($permiso)){
                    $pantalla = Pantalla::find($item['pantalla_id']);
                    $mensaje = (!is_null($pantalla)) ? ' el permiso para la pantalla '.$pantalla->nombre : ' los permisos.';
                    throw new Exception('Ocurrio un error al intentar grabar'.$mensaje);
                }
            }
            DB::commit();
            $mensaje = "Los permisos han sido registrados exitosamente.";
            $tipoMensaje = "success";
        }catch(Exception $e){   
            DB::rollback();             
            $mensaje = $e->getMessage();
            $tipoMensaje = "danger";
        }

        return response()->json(['mensaje' => $mensaje, 'tipo-mensaje' => $tipoMensaje]);
    }

    private function grabar(Permiso $permiso)
    {
        $validacion = $this->validaDatos($permiso, $permiso->id == 0 ? null : $permiso->id);
        if($validacion->fails()){
            $pantalla = Pantalla::find($permiso->pantalla_id);
            $mensaje = (!is_null($pantalla)) ? ' para la pantalla '.$pantalla->nombre : '';
            throw new Exception('Existe campos incompletos o no válidos al registrar los permisos'.$mensaje.".");
        }
        return $permiso->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $permiso = Permiso::join('roles','permisos.roles_id','=','roles.id')
                            ->select('permisos.*','roles.nombre as rol')
                            ->find($id);
        
        return response()->json($permiso);
    }


    public function getByRol($idRol)
    {
        //Deshabilitar en config/database.php 'strict'=>false
        $sql = "SELECT * FROM 
                (SELECT
                    pantallas.nombre AS pantalla,
                    pantallas.id AS id_pantalla,
                    roles.nombre AS rol,
                    permisos.*
                FROM
                    permisos
                RIGHT JOIN roles ON permisos.rol_id = roles.id
                RIGHT JOIN pantallas ON permisos.pantalla_id = pantallas.id 
                WHERE
                    roles.id = ?
                AND permisos.deleted_at IS NULL
                
                UNION ALL 
                
                SELECT
                    pantallas.nombre AS pantalla,
                    pantallas.id AS id_pantalla,
                    roles.nombre AS rol,
                    permisos.*
                FROM
                    pantallas
                LEFT JOIN permisos ON permisos.pantalla_id IS NULL 
                LEFT JOIN roles ON permisos.rol_id = roles.id 
                WHERE
                    permisos.deleted_at IS NULL
                ) AS qry
                GROUP BY qry.id_pantalla";

        $permisos = DB::select($sql, array($idRol));
        //return response()->json($permisos->toSql());
        return response()->json($permisos);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function filtrar($texto, $page = 0)
    {
        $allPermisos = Permiso::join('roles','permisos.rol_id','=','roles.id')
                                ->select('permisos.*','roles.nombre as nombre')
                                ->orderBy('roles.nombre','asc');

        if(isset($texto) && $texto != "")
        {
            $allPermisos = $allPermisos->where('nombre.roles','Like','%'.$texto.'%')
                                    ->orWhere('permisos.acceder','=',$texto)
                                    ->orWhere('permisos.crear','=',$texto)
                                    ->orWhere('permisos.actualizar','=',$texto)
                                    ->orWhere('permisos.eliminar','=',$texto);
        }

        $cantReg = count($allPermisos->get());

        $permisos = $allPermisos->skip($this->rowsByPage * $page)
                                ->take($this->rowsByPage)
                                ->get();

        return response()->json(['data' => $permisos->toArray(), 'rows' => $cantReg, 'page' => $page, 'rowsByPage' => $this->rowsByPage]);
    }


    private function validaDatos(Permiso $permiso, $id)
    {
        $rules = [
            'rol_id' => 'required|exists:roles,id',
            'pantalla_id' => 'required|exists:pantallas,id',
            'acceder' => 'required',
            'crear' => 'required',
            'actualizar' => 'required',
            'eliminar' => 'required'
        ];

        $messages = [
            'rol_id.required' => 'Debe seleccionar un rol.',
            'rol_id.exists' => 'El rol seleccionado no existe o no es válido.',
            
            'pantalla_id.required' => 'Debe asociar una pantalla o formulario.',
            'pantalla_id.exists' => 'La pantalla seleccionada no existe o no es válida.',

            'acceder.required' => 'Debe especificar si el usuario posee permisos para ver el listado de registros.',
            'crear.required' => 'Debe especificar si el usuario posee permisos para ingresar registros.',
            'actualizar.required' => 'Debe especificar si el usuario posee permisos para actualizar registros.',
            'eliminar.required' => 'Debe especificar si el usuario posee permisos para eliminar registros.',
        ];

        return Validator::make($permiso->toArray(), $rules, $messages);
    }
}
