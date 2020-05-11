<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Menu;
use Validator;

class MenusController extends Controller
{
    
    private $rowsByPage = 10;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * 
     * Retorna sólo la cantidad de registros indicados en $this->rowsByPage
     */
    public function index($pag=0)
    {
        $allMenus = Menu::join('pantallas','menus.pantalla_id','=','pantallas.id')
                        ->leftjoin('menus as menu_padre','menus.menu_padre_id','=','menu_padre.id')
                        ->select('menus.*', 'pantallas.nombre as nombre_pantalla', 'pantallas.tabla as nombre_tabla','menu_padre.nombre as menu_padre')
                        ->orderBy('menu_padre.nombre','ASC')
                        ->orderBy('menus.nombre','ASC');
        $menus = $allMenus
            ->skip($pag*$this->rowsByPage)
            ->take($this->rowsByPage)
            ->get();

        return response()->json(['data'=>$menus,'rows'=>count($allMenus->get()),'page'=>$pag,'rowsByPage'=>$this->rowsByPage]);
    }
    

    //Retorna todos los registros 
    public function getAll()
    {
        $menus = Menu::join('pantallas','menus.pantalla_id','=','pantallas.id')
                        ->leftjoin('menus as menu_padre','menus.menu_padre_id','=','menu_padre.id')
                        ->select('menus.*', 'pantallas.nombre as nombre_pantalla', 'pantallas.tabla as nombre_tabla','menu_padre.nombre as menu_padre')
                        ->orderBy('menu_padre.nombre','ASC')
                        ->orderBy('menus.nombre','ASC')
                        ->get();

        return response()->json($menus);
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
        if($request->menu_padre_id == 0)$request->menu_padre_id = null;
        
        $validator = $this->validaDatos($request, null); 
        if($validator->fails()){
            return response()->json(["mensaje"=>"Datos no válidos o incompletos:", "errores"=> $validator->errors(),'tipo-mensaje'=>'danger']);
        }
        $menu = new Menu();

        $result = $menu->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrio un error al intentar grabar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $id = $result ? $menu->id : -1;

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
        $menu = Menu::find($id);
        if($menu != null){
            $menu['pantalla'] = $menu->pantalla();
        }

        return response()->json($menu);
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
        //return response()->json($request->all());

        $validator = $this->validaDatos($request, $id);
        if($validator->fails()){
            return response()->json(['mensaje'=>'Datos no válidos o incompletos','errores'=>$validator->errors(),'tipo-mensaje'=>'danger']);
        }

        $menu = Menu::find($id);
        $result = $menu->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido actualizado.":"Ocurrio un error al intentar actualizar el registro.";
        $tipoMensaje = $result ? "success":"danger";

        return response()->json(['mensaje'=>$mensaje,'tipo-mensaje'=>$tipoMensaje]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $menu = Menu::find($id);
        $result = $menu->delete();
        $mensaje = $result ? "El registro ha sido eliminado.":"Ocurrio un error al intentar eliminar el registro.";
        $tipoMensaje = $result ? "success":"danger";

        return response()->json(['mensaje'=>$mensaje,'tipo-mensaje'=>$tipoMensaje]);
    }

    
    public function filtrar($texto, $pag = 0)
    {   
        if($texto == ""){
            $allMenus = Menu::join('pantallas','menus.pantalla_id','=','pantallas.id')
                        ->leftjoin('menus as menu_padre','menus.menu_padre_id','=','menu_padre.id')
                        ->select('menus.*', 'pantallas.nombre as nombre_pantalla', 'pantallas.tabla as nombre_tabla','menu_padre.nombre as menu_padre')
                        ->orderBy('menu_padre.nombre','ASC')
                        ->orderBy('menus.nombre','ASC');
        }else{
            $allMenus = Menu::join('pantallas','menus.pantalla_id','=','pantallas.id')
                        ->leftjoin('menus as menu_padre','menus.menu_padre_id','=','menu_padre.id')
                        ->select('menus.*', 'pantallas.nombre as nombre_pantalla', 'pantallas.tabla as nombre_tabla','menu_padre.nombre as menu_padre')
                        ->where('menus.nombre','LIKE','%'.$texto.'%')
                        ->orWhere('menus.icono_fa_class','LIKE','%'.$texto.'%')
                        ->orWhere('menus.posicion','=',$texto)
                        ->orWhere('menus.url','LIKE','%'.$texto.'%')
                        ->orderBy('menu_padre.nombre','ASC')
                        ->orderBy('menus.nombre','ASC');
        }
        $menus = $allMenus->skip($pag*$this->rowsByPage)
                            ->take($this->rowsByPage)
                            ->get();

        return response()->json(['data'=>$menus,'rows'=>count($allMenus->get()),'page'=>$pag,'rowsByPage'=>$this->rowsByPage]);
    }


    private function validaDatos(Request $request, $id = null){
        $rules = [
            'nombre'=>'required|min:5|max:100|unique:menus,id,'.$id,
            'icono_fa_class'=>'required|min:5|max:50',
            'posicion' => 'required|numeric|min:0',
            'pantalla_id'=>'required|exists:pantallas,id',
            'url'=>'required|min:1|max:255'
        ];
        if($request->menu_padre_id != null){
            $rules += [
                'menu_padre_id'=>'exists:menus,id',//sometimes require que el campo sea nullable
            ];
        }

        $messages =[
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.min' => 'El nombre debe tener un mínimo de 5 carácteres. Ingresa un nombre mas largo.',
            'nombre.max'=>'El nombre debe tener un máximo de 100 carácteres. Ingresa un nombre mas corto.',
            'nombre.unique'=>'El nombre ingresado ya se encuentra en uso.',

            'icono_fa_class.required'=>'El nombre de la clase para el icono es obligatorio.',
            'icono_fa_class.min'=>'La clase para el icono debe tener un mínimo de 5 carácteres. Ingresa un nombre de clase más largo.',
            'icono_fa_class.max'=>'La clase para el icono debe tener un máximo de 50 carácteres. Ingresa un nombre de clase más corto.',

            'menu_padre_id.numeric'=>'El Id del menú padre debe ser numérico.',
            'menu_padre_id.min'=>'El id del menu padre debe ser igual o mayor a 0.',
            'menu_padre_id.exists'=>'El menú padre seleccionado no existe.',

            'posicion.required'=>'Debes ingresar la posición del menú',
            'posicion.numeric'=>'La posición del menu debe ser un valor númerico.',
            'posicion.min'=>'La posición del menú no puede ser menor a 0.',

            'pantalla_id.required'=>'El código de la pantalla asociado al menú el obligatorio.',
            'pantalla_id.exists'=>'No existe ninguna pantalla con el cóigo ingresado.',

            'url.required'=>'Debe ingresar la url asociada a éste menú',
            'url.min'=>'La url debe tener almenos un carácter.',
            'url.max' =>'La url debe tener un máximo de 255 carácteres. Ingresa una url más corta.'
        ];

        return Validator::make($request->all(), $rules, $messages);
    }
}
