<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Categoria;
use Validator;

class CategoriasController extends Controller
{
    private $rowsByPage = 10;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($page = 0)
    {
        $allCategorys = Categoria::orderBy('nombre', 'asc');

        $totRows = count($allCategorys->get());

        $categorias = $allCategorys->skip($this->rowsByPage * $page)
                                    ->take($this->rowsByPage)
                                    ->get();

        return response()->json(['data' => $categorias->ToArray(), 'rows' => count($allCategorys->get()), 'page' => $page, 'rowsByPage' => $this->rowsByPage]);
        //
    }


    public function getAll()
    {
        $categorias = Categoria::all();

        return response()->json($categorias->ToArray());
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
        $validacion = $this->validaDatos($request,  null);
        if($validacion->fails()){
            return response()->json(['mensaje'=>'Existen campos incompletos o no validos', 'errores' => $validacion->errors()]);
        }
        $categoria = new Categoria();
        $res = $categoria->fill($request->all())->save();
        $mensaje = $res ? 'El registro ha sido ingresado.' : 'Ocurrió un error al intentrar ingresar el registro.';
        $tipoMensaje = $res ? 'success' : 'danger';
        $id = $res ? $categoria->id : -1;
        
        return response()->json(['mensaje' => $mensaje,  'tipo-mensaje' => $tipoMensaje, 'id' => $id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $categoria = Categoria::find($id);

        return response()->json($categoria);
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
        $validacion = $this->validaDatos($request,  null);
        if($validacion->fails()){
            return response()->json(['mensaje'=>'Existen campos incompletos o no validos', 'errores' => $validacion->errors()]);
        }
        $categoria = Categoria::find($id);
        $res = $categoria->fill($request->all())->save();
        $mensaje = $res ? 'El registro ha sido actualizado.' : 'Ocurrió un error al intentrar actualizar el registro.';
        $tipoMensaje = $res ? 'success' : 'danger';        
        
        return response()->json(['mensaje' => $mensaje,  'tipo-mensaje' => $tipoMensaje]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $categoria = Categoria::find($id);
        $res = $categoria->delete();
        $mensaje = $res ? 'El registro ha sido eliminado.' : 'Ocurrió un error al intentar eliminar el registro.';
        $tipoMensaje = $res ? 'success' : 'danger';

        return response()->json(['mensaje' => $mensaje, 'tipo-mensaje' => $tipoMensaje]);
    }


    public function filtrar($texto, $page = 0)
    {
        $allCategorys = Categoria::orderBy('nombre','asc');
        
        if(isset($texto))
        {
            $allCategorys = $allCategorys->where('nombre','Like','%'.$texto.'%'); 
        }
        $totRows = count($allCategorys->get());
        $categorias = $allCategorys->skip($this->rowsByPage * $page)
                                    ->take($this->rowsByPage)
                                    ->get();
        return response()->json(['data' => $categorias->ToArray(), 'rows' => $totRows, 'page' => $page, 'rowsByPage' => $this->rowsByPage]);
    }


    private function validaDatos(Request $request, $id)
    {
        $rules = [
            'nombre' => 'required|min:3|max:50|unique:categorias,id,'.$id
        ];

        $messages = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.min' => 'El nombre debe tener almenos 3 carácteres. Ingresa un nombre más largo.',
            'nombre.max' => 'El nombre debe tener un máximo de 50 carácteres. Ingresa un nombre más corto.',
            'nombre.unique' => 'El nombre ya se encuentra registrado. Ingresa un nombre diferente'
        ];

        return Validator::make($request->all(), $rules, $messages);
    }


    
    
}
