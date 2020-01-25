<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Producto;
use App\ImagenesProducto;
use Validator;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productos = Producto::join("marcas","productos.marca_id","=","marcas.id")
                            ->join("categorias","productos.categoria_id","=","categorias.id")
                            ->select("productos.*","marcas.nombre as marca", "categorias.nombre as categoria")
                            ->get();
        
        foreach($productos as $item)
        {
            $imagenes = ImagenesProducto::where("producto_id","=",$item->id)->get();
            $item->imagenes = $imagenes;
        }

        return response()->json($productos->ToArray());
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
        $validar = $this->validarCampos($request);
        if($validar->fails())
        {
            return response()->json(["mensaje"=>"Datos incompletos o no válidos", "errores"=>$validar->errors()]);
        }

        $producto = new Producto();
        $result = $producto->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido creado." : "Ocurrio un error al intentar ingresar el registro.";
        $tipoMensaje = $result ? "success" : "danger";
        $id = $result ? $producto->id : -1;

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
        $producto = Producto::join("marcas","productos.marca_id","=","marcas.id")
                            ->join("categorias","productos.categoria_id","=","categorias.id")
                            ->select("productos.*","marcas.nombre as marca", "categorias.nombre as categoria")
                            ->find($id);

        if($producto != null)
        {
            $imagenes = ImagenesProducto::where("producto_id","=",$producto->id)->get();
            $producto->imagenes = $imagenes;
        }
        return response()->json($producto);
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
        $validar = $this->validarCampos($request, $id);
        if($validar->fails())
        {
            return response()->json(["mensaje"=>"Datos incompletos o no válidos", "errores"=>$validar->errors()]);
        }

        $producto = Producto::find($id);
        $result = $producto->fill($request->all())->save();
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
        $producto = Producto::find($id);
        $result = $producto->delete();
        $mensaje = $result ? "El registro ha sido eliminado." : "Ocurrio un error al intentar eliminar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }

    public function filtrar($filtro)
    {
        if(!isset($filtro) || $filtro == "")
        {
            $productos = Producto::join("marcas","productos.marca_id","=","marcas.id")
                                ->join("categorias","productos.categoria_id","=","categorias.id")
                                ->select("productos.*","marcas.nombre as marca", "categorias.nombre as categoria")
                                ->get();
        }else{
            $productos = Producto::join("marcas","productos.marca_id","=","marcas.id")
                                ->join("categorias","productos.categoria_id","=","categorias.id")
                                ->where("productos.nombre","Like","%".$filtro."%")
                                ->orWhere("productos.descripcion","Like","%".$filtro."%")
                                ->orWhere("productos.resumen","Like","%".$filtro."%")
                                ->orWhere("productos.precio","Like","%".$filtro."%")
                                ->orWhere("productos.precio_anterior","Like","%".$filtro."%")
                                ->orWhere("productos.color","Like","%".$filtro."%")
                                ->orWhere("marcas.nombre","Like","%".$filtro."%")
                                ->orWhere("categorias.nombre","Like","%".$filtro."%")
                                ->select("productos.*","marcas.nombre as marca","categorias.nombre as categoria")
                                ->get();
        }

        foreach($productos as $item)
        {
            $imagenes = ImagenesProducto::where("producto_id","=",$item->id)->get();
            $item->imagenes = $imagenes;
        }
        return response()->json($productos->ToArray());
    }


    private function validarCampos(Request $request, $id = null)
    {
        $rules = [
            "nombre" => "required|min:5|max:50|unique:productos,nombre,".$id,
            "descripcion" => "required|min:10|max:500",
            "resumen" => "required|min:10|max:255",
            "slug" => "required|min:3|max:255|unique:productos,slug,".$id,
            "categoria_id" => "required|exists:categorias,id",
            "marca_id" => "required|exists:marcas,id",
            "precio" => "required|integer|min:0|max:9999999999",
            "precio_anterior" => "required|numeric|min:0|max:9999999999",
            "visible" => "required|integer|min:0|max:1",
            "color" => "required|min:0|max:20",
            "nuevo" => "required|integer|min:0|max:1",
            "oferta" => "required|integer|min:0|max:1"
        ];

        $messages = [
            'categoria_id.required' => 'Debe seleccionar una categoría.',
            'categoria_id.exists' => 'La categoría seleccionada no exsite.',

            'nombre.required' => 'El campo nombre es obligatorio',
            'nombre.min' => 'El nombre debe tener un mínimo de 5 carácteres. Ingrese un  nombre más largo.',
            'nombre.max' => 'El nombre debe tener un máximo de 150 carácteres. Ingrese un nombre más corto.',
            'nombre.unique' => 'El nombre del producto ya se encuentra registrado. Ingresa un nombre diferente.',
            'descripcion.required' => 'Debe ingresar la descripción del producto.',
            'descripcion.min' => 'La descripción debe tener almenos 3 carácteres. Ingresa una descripción más larga.',
            'descripcion.min' => 'La descripción debe tener un máximo de 500 carácteres. Ingresa una descripción más corta.',
            'resumen.required' => 'Debe ingresar un resumen de la descripción del producto.',
            'resumen.min' => 'El resumen debe tener un mínimo de 10 carácteres. Ingrese un resumen más extenso.',
            'resumen.max' => 'El resumen debe tener un máximo de 300 carácteres. Ingrese un resumen más breve.',
            
            'precio.required' => 'Debe ingresar el precio del producto.',
            'precio.integer' => 'El precio del producto no debe contener decimales. Infrese sólo números enteros',
            'precio.min' => 'El precio no puede ser un valor negativo',
            'precio.max' => 'El precio ingresado es demasiado largo. Ingresa un precio menor',

            'precio_anterior.required' => 'Debe ingresar el precio anterior del producto. En su defecto ingrese cero (0).',
            'precio_anterior.integer' => 'El precio anterior del producto no debe contener decimales. Infrese sólo números enteros',
            'precio_anterior.min' => 'El precio anterior no puede ser un valor negativo',
            'precio_anterior.max' => 'El precio anterior ingresado es demasiado largo. Ingresa un precio menor',

            'visible.integer' => 'El valor para el campo visible no es válido.',
            'visible.min' => 'El valor para el campo visible no es válido. Ingrese 0 o 1',           
            'visible.max' => 'El valor para el campo visible no es válido. Ingrese 0 o 1',           
            'color.required' => 'Debe ingresar el color del producto.',
            'color.min' => 'El nombre del color es muy corto. Ingrese un mínimo de 3 carácteres.',
            'color.max' => 'El nombre del color es muy largo, Ingrese un máximo de 20 carácteres.',
            'nuevo.integer' => 'El valor para el campo nuevo no es válido.',            
            'nuevo.min' => 'El valor para el campo nuevo no es válido. Ingrese 0 o 1',           
            'nuevo.max' => 'El valor para el campo nuevo no es válido. Ingrese 0 o 1',           
            'oferta.integer' => 'El valor para el campo oferta no es válido.',
            'oferta.min' => 'El valor para el campo oferta no es válido. Ingrese 0 o 1',           
            'oferta.max' => 'El valor para el campo oferta no es válido. Ingrese 0 o 1',            
            //'imagen_predeterminada.required' => 'Debe seleccionar la imágen por defecto (o imágen principal) del producto.',
            //'imagenes.one_of' => 'Debe seleccionar almenos una imágen para el producto.',
        ];

        return Validator::make($request->all(), $rules, $messages);
    }
}
