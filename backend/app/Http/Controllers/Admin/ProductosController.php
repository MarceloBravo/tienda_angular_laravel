<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\DB;
use App\Producto;
use App\ImagenesProducto;
use Validator;
use DB;
use Carbon\Carbon;

class ProductosController extends Controller
{
    private $rowsByPage = 10;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($page = 0)
    {
        $allReg = Producto::join("marcas","productos.marca_id","=","marcas.id")
                            ->join("categorias","productos.categoria_id","=","categorias.id")
                            ->select("productos.*","marcas.nombre as marca", "categorias.nombre as categoria")
                            ->orderBy('productos.nombre','asc');


        $CantReg = count($allReg->get());

        $productos = $allReg->skip($this->rowsByPage * $page)
                            ->take($this->rowsByPage)
                            ->get();
        
        foreach($productos as $item)
        {
            $imagenes = ImagenesProducto::where("producto_id","=",$item->id)->get();
            $item->imagenes = $imagenes;
        }

        return response()->json(['data'=>$productos->ToArray(), 'rows' => $CantReg, 'page' => $page, 'rowsByPage' => $this->rowsByPage]);
    }


    public function getAll()
    {
        $productos = Producto::join('marcas','productos.marca_id','=','marcas.id')
                            ->join('categorias','productos.categoria_id','=','catgorias.id')
                            ->select('productos.*','marcas.nombre as marca','categorias.nombre as categoria')
                            ->orderby('productos.nombre','asc')
                            ->get();

        return response()->json($productos->toArray());
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
            return response()->json(["mensaje"=>"Datos incompletos o no válidos", "tipo-mensaje" => "danger", "errores"=>$validar->errors()]);
        }

        try{
            $producto = new Producto();
            DB::begiTransaction();
            $result = $producto->fill($request->all())->save();
            $mensaje = $result ? "El registro ha sido creado." : "Ocurrio un error al intentar ingresar el registro.";
            $tipoMensaje = $result ? "success" : "danger";
            $id = $result ? $producto->id : -1;
            if($result && $request->file("file") !== null){
                $resultImage = $this->_uploadFile($request, $id);
                if($resultImage['tipo-mensaje'] == "danger"){
                    $mensaje = $resultImage['mensaje'];
                    $tipoMensaje = $resultImage['tipo-mensaje'];
                    $result = false;
                }
            }
            
            if($result){
                DB::rollback();
            }else{
                DB::commit();
            }

        }catch(Exception $ex){
            $mensaje = "Ocurrio un error al intentar ingresar el registro: ".$ex->getMessage();
            $tipoMensaje = "danger";
            $id = -1;
        }

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
        //dd($request->all(),$request->file('file'));
        return response()->json(['all' =>$request->all(), 'file' =>$request->file('file')]);
        
        $validar = $this->validarCampos($request, $id);
        if($validar->fails())
        {
            return response()->json(["mensaje"=>"Datos incompletos o no válidos", "tipo-mensaje" => "danger", "errores"=>$validar->errors()]);
        }

        $producto = Producto::find($id);
        try{
            DB::beginTransaction();            
            $result = $producto->fill($request->all())->save();
            $mensaje = $result ? "El registro ha sido actualizado." : "Ocurrio un error al intentar actualizar el registro.";
            $tipoMensaje = $result ? "success" : "danger";
            if($result && $request->input("file") !== null){
                $resultImage = $this->updateFile($request, $id);
                if($resultImage['tipo-mensaje'] == "danger"){
                    $mensaje = $resultImage['mensaje'];
                    $tipoMensaje = $resultImage['tipo-mensaje'];
                    $result = false;
                }
            }
            
            if($result){
                DB::rollback();
            }else{
                DB::commit();
            }

        }catch(Exception $ex){
            $mensaje = "Ocurrio un error al intentar actualizar el registro: ".$ex->getMessage();
            $tipoMensaje = "danger";
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
        $producto = Producto::find($id);
        $result = $producto->delete();
        $mensaje = $result ? "El registro ha sido eliminado." : "Ocurrio un error al intentar eliminar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(["mensaje"=>$mensaje, "tipo-mensaje"=>$tipoMensaje]);
    }

    public function filtrar($filtro, $page = 0)
    {
        if(!isset($filtro) || $filtro == "")
        {
            $allReg = Producto::join("marcas","productos.marca_id","=","marcas.id")
                                ->join("categorias","productos.categoria_id","=","categorias.id")
                                ->select("productos.*","marcas.nombre as marca", "categorias.nombre as categoria")
                                ->orderBy('productos.nombre','asc');
        }else{
            $allReg = Producto::join("marcas","productos.marca_id","=","marcas.id")
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
                                ->orderBy('productos','asc');
        }
        
        $cantReg = count($allReg->get());

        $productos = $allReg->skip($this->rowsByPage * $page)
                                ->take($this->rowsByPage)
                                ->get();
        foreach($productos as $item)
        {
            $imagenes = ImagenesProducto::where("producto_id","=",$item->id)->get();
            $item->imagenes = $imagenes;
        }
        
        return response()->json(['data'=>$productos->ToArray(), 'rows' => $CantReg, 'page' => $page, 'rowsByPage' => $this->rowsByPage]);
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
            "color" => "required|min:0|max:20"
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

            'color.required' => 'Debe ingresar el color del producto.',
            'color.min' => 'El nombre del color es muy corto. Ingrese un mínimo de 3 carácteres.',
            'color.max' => 'El nombre del color es muy largo, Ingrese un máximo de 20 carácteres.',
            'nuevo.integer' => 'El valor para el campo nuevo no es válido.', 
        ];

        return Validator::make($request->all(), $rules, $messages);
    }


    

    private function _uploadFile(Request $request, $id)
    {
        if($request->input("file") !== null){
            $repositorio = new ImagenesProducto();
            return $this->storeFile($repositorio, $request, $id);
        }else{
            return ['mensaje' => 'No se han recibido archivos', 'tipo-mensaje' => 'danger'];
        }
    }



    //PUT
    private function UpdateFile(Request $request, $id)
    {
        if($request->input("file") !== null){
            $repositorio = ImagenesProducto::find($id);
            return $this->storeFile($repositorio, $request, $id);
        }else{
            return ['mensaje' => 'No se han recibido archivos', 'tipo-mensaje' => 'danger'];
        }
    }


    private function storeFile($repositorio, Request $request, $id){
        try{
            $archivo = $this->uploadFile($request->input('file'), 'docs', true);
            
            if($archivo != ""){
                $repositorio->producto_id = $id;
                $repositorio->nombre_archivo = $request->input("file")->getClientOriginalName();
                $repositorio->url = $archivo;
            
                $res = $repositorio->save();
                if($archivo != "")
                $mensaje = $res ? "El archivo de imagen sido subido." : "Ocurrió un error al intentar subir el archivo.";
                $tipoMensaje = $res ? "success" : "danger";

                return ['mensaje' => $mensaje, 'tipo-mensaje' => $tipoMensaje];
            }else{
                return ['mensaje' => '', 'tipo-mensaje' => ''];
            }

        }catch(Exception $error){ 
            return ['mensaje' => 'Ocurrió un error al intentar subir el archivo: ' .$error->getMessage(), 'tipo-mensaje' => 'danger'];
        }
    }

    private function uploadFile($path, $destino = 'local', $sobreescribir = false){
        $name = "";
        if(!empty($path)){
            $name = ($sobreescribir ? "" : Carbon::now()->second).$path->getClientOriginalName();
            //$this->attributes['afiche'] = $name;    //Asigna automáticamente el nombre al cargar los datos en el controlador, con la función fill($request->all())
            \Storage::disk($destino)->put($name, \File::get($path));            
        }
        return $name;   //En el caso de no cargar los datos con la función fill($request->all()), se debuelve el nombre generado para el archivo. 
    }
}
