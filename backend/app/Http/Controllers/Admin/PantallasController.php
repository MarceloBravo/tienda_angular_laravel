<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Pantalla;
use Validator;

class PantallasController extends Controller
{
    private $rowsByPage = 10;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($pag=0)
    {
        $allPantallas = Pantalla::leftJoin('menus','pantallas.id','=','menus.pantalla_id')
                            ->select('pantallas.*',
                            'menus.nombre as menu',
                            'menus.icono_fa_class',
                            'menus.menu_padre_id',
                            'menus.posicion',
                            'menus.url')
                            ->orderBy('menus.nombre');
                            
        $pantallas = $allPantallas
                    ->skip($pag * $this->rowsByPage)
                    ->take($this->rowsByPage)
                    ->get();

        return response()->json(['data'=>$pantallas->toArray(), 'rows'=>count($allPantallas->get()),'page'=>$pag,'rowsByPage'=>$this->rowsByPage]);
    }



    public function getAll($pag=0)
    {
        $pantallas = Pantalla::leftJoin('menus','pantallas.id','=','menus.pantalla_id')
                            ->select('pantallas.*',
                            'menus.nombre as menu',
                            'menus.icono_fa_class',
                            'menus.menu_padre_id',
                            'menus.posicion',
                            'menus.url')
                            ->get();

        return response()->json($pantallas->ToArray());
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = $this->validaDatos($request, null);
        if($validator->fails())
        {
            return response()->json(["mensaje"=>"Datos no válidos o incompletos:", "errores"=>$validator->errors()]);
        }

        $pantalla = new Pantalla();
        $result = $pantalla->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrio un error al intentar insertar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $id = $result ? $pantalla->id : -1;

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
        $pantalla = Pantalla::find($id);

        return response()->json($pantalla);
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
        $validator = $this->validaDatos($request, $id);
        if($validator->fails())
        {
            return response()->json(["mensaje"=>"Datos no válidos o incompletos:", "errores"=>$validator->errors()]);
        }

        $pantalla = Pantalla::find($id);
        $result = $pantalla->fill($request->all())->save();
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
        $pantalla = Pantalla::find($id);
        $result = $pantalla->delete();
        $mensaje = $result ? "El registro ha sido eliminado." : "Ocurrio un error al intentar eliminar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }

    public function filtrar($filtro, $pag = 0)
    {
        if(!isset($filtro))
        {
            $allPantallas = Pantalla::leftJoin('menus','pantallas.id','=','menus.pantalla_id')
                            ->select('pantallas.*',
                            'menus.nombre as menu',
                            'menus.icono_fa_class',
                            'menus.menu_padre_id',
                            'menus.posicion',
                            'menus.url')
                            ->orderBy('menus.nombre');
        }else{
            $allPantallas = Pantalla::leftJoin("menus","menus.pantalla_id","=","pantallas.id")
                                ->where("pantallas.nombre","Like","%".$filtro."%")
                                ->orWhere("pantallas.tabla","Like","%".$filtro."%")
                                ->orWhere("menus.nombre","Like","%".$filtro."%")
                                ->orWhere("menus.icono_fa_class","Like","%".$filtro."%")
                                ->orWhere("menus.posicion","Like","%".$filtro."%")
                                ->orWhere("menus.url","Like","%".$filtro."%")
                                ->select("pantallas.*","menus.nombre as menu", "menus.url")
                                ->orderBy("menus.nombre");
        }
        $pantallas = $allPantallas
                    ->skip($pag * $this->rowsByPage)
                    ->take($this->rowsByPage)
                    ->get();

        return response()->json(['data'=>$pantallas->toArray(), 'rows'=>count($allPantallas->get()),'page'=>$pag,'rowsByPage'=>$this->rowsByPage]);
        //return response()->json($pantallas->ToArray());
    }

    private function validaDatos(Request $request, $id)
    {
        $rules = [
            'nombre' => 'required|min:3|max:50|unique:pantallas,nombre,'.$id,
            'tabla' => 'required|min:3|max:50',
            'permite_crear' => 'boolean',
            'permite_editar' => 'boolean',
            'permite_eliminar' => 'boolean',
        ];

        $messages = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.min' => 'El nombre debe tener un mínimo de 3 carácteres. Ingresa un nombre más largo.',
            'nombre.max' => 'El nombre debe tener un máximo de 50 carácteres. Ingresa un nombre más corto.',
            'nombre.unique' => 'El nombre ya se encuentra en uso. Ingresa un nomnre diferente.',

            'tabla.required' => 'El campo tabla es obligatorio.',
            'tabla.min' => 'El campo tabla debe tener un mínimo de 3 carácteres. Ingresa un nombre de tabla más largo.',
            'tabla.max' => 'El campo tabla debe tener un máximo de 50 carácteres. Ingresa un nombre de tabla más corto.',

            'permite_crear.boolean' => 'El valor ingresado para el campo "permite crear" no es válido.',

            'permite_editar.boolean' => 'El valor ingresado para el campo "permite crear" no es válido.',

            'permite_eliminar.boolean' => 'El valor ingresado para el campo "permite crear" no es válido.',
        ];

        return Validator::make($request->all(),$rules, $messages);
    }
    
}
