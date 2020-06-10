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
            $item->ruta_imagen = explode('/api/',url()->current())[0] . '/storage/productos' ;
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
        //return response()->json(["mensaje"=>$request->$request['imagenes'], 'tipo-mensaje' => 'warning']);

        $validar = $this->validarCampos($request);
        if($validar->fails())
        {
            return response()->json(["mensaje"=>"Datos incompletos o no válidos", "tipo-mensaje" => "danger", "errores"=>$validar->errors()]);
        }

        $request['imagenes'] = is_null($request['imagenes']) ? [] : array_map(function($i){return json_decode($i);}, $request['imagenes']);
        try{
            $producto = new Producto();
            DB::beginTransaction();
            $result = $producto->fill($request->all())->save();    
            if(!$result){$mensaje =  "Ocurrio un error al intentar ingresar el registro.";}
            if(!$result){$tipoMensaje = "danger";} 
            $id = $result ? $producto->id : -1;
            if($result && $request->file("file") !== null){
                $resultImage = $this->saveImages($request, $id);
                if($resultImage['tipo-mensaje'] == "danger"){
                    $mensaje = $resultImage['mensaje'];
                    $tipoMensaje = $resultImage['tipo-mensaje'];
                    $result = false;
                }
            }
            
            if(!$result){
                DB::rollback();
            }else{
                $mensaje =  "El registro ha sido creado.";
                $tipoMensaje = "success";
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
            $producto->ruta_imagen = explode('/api/',url()->current())[0] . '/storage/productos' ;
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


    
    function searchUploadFile($objFile, $nombreArchivo)
    {
        return $objFile->name == $nombreArchivo;
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
            return response()->json(["mensaje"=>"Datos incompletos o no válidos", "tipo-mensaje" => "danger", "errores"=>$validar->errors()]);
        }


        $request['imagenes'] = array_map(function($i){return json_decode($i);}, $request['imagenes']);

        $producto = Producto::find($id);
        try{
            DB::beginTransaction();            
            $result = $producto->fill($request->all())->save();
            $tipoMensaje = "";

            if($result && count($request["imagenes"]) > 0){
                $resultImage = $this->saveImages($request, $id);
                if($resultImage['tipo-mensaje'] == "danger"){
                    $result = false;
                }
                $mensaje = $resultImage['mensaje'];
                $tipoMensaje = $resultImage['tipo-mensaje'];
            }

            if($result && isset($request['deletedFiles'])){
                
                foreach($request['deletedFiles'] as $fileId){
                    $result = $this->deleteFile($fileId);
                    if($result['tipo-mensaje'] == 'danger'){
                        break;
                    }
                }
            }
            
            if(!$result){
                DB::rollback();
            }else{
                $mensaje = $result ? "El registro ha sido actualizado." : "Ocurrio un error al intentar actualizar el registro.";
                $tipoMensaje = $result ? "success" : "danger";
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

    
    private function saveImages(Request $request, $id)
    {        
        if($request["imagenes"] > 0){
            $files = $request->file('file');

            foreach($request['imagenes']  as $archivo){
                
                $registro = ImagenesProducto::find($archivo->id);
                if(!is_null($registro)){
                    //Actualizando los datos de las imágenes en la tabla de base de datos
                    $res = $this->registrarArchivoEnDb($registro, $archivo, $id);
                    if($res['tipo-mensaje'] == 'danger'){
                        return $res;
                    }
                }else{
                    //Procesa los archvios de imágenes Nuevos
                    $res = $this->procesarArchivosNuevos($request, $id, $archivo->nombre_archivo, $archivo->default);
                }
            }

            return $res;
        }else{
            return ['mensaje' => 'No se han recibido archivos', 'tipo-mensaje' => 'danger'];
        }
    }


    
    //Asocia los datos como el nombre del archivo y si ésta imágen es configurada como la imágen por defecto para el producto, con 
    //el archivo de imágen recibido en la variable $request->file('file'), el nombre y la configuración "archivo por defecto"
    //serán almacenadas en un registro en la tabla imagenes_producto, el archivo en si será almacenado en una carpeta en disco.
    //Solo procesa los archivo nuevos
    private function procesarArchivosNuevos($request, $id, $nombreArchivo, $isDefault){
        foreach($request->file("file")  as $archivo){
            if($archivo->getClientOriginalName() == $nombreArchivo){    //Si el nombre recibido en el objeto que contiene la información del archivo coincide con el nombre del archivo recibido se procede a registrar la información del archivo en la tabla de base de datos

                $registro = new ImagenesProducto(); //Crea un registro
                $url = $this->uploadFile($id, $archivo);    //Sube el archivo a la carpeta de almacenamiento y devbuelve la ruta relativa originada
                if($url !== ""){    
                    $archivo->url = $url;
                    $registro->nombre_archivo = $nombreArchivo;
                    $archivo->default = $isDefault;
                    
                    $res = $this->registrarArchivoEnDb($registro, $archivo, $id);
                    if($res['tipo-mensaje'] == 'danger'){
                        return $res;
                    }
                }else{
                    //Si no se recibe quiere decir que no fue posible grabar el archivo en la carpeta de almacenmiento para las imágenes
                    return ['mensaje' => 'Error al intentar subir un archivo.', 'tipo-mensaje' => 'warning'];
                }
                
            }
        }
    }


   //Registra el archivo en la tabla imágenes_producto     
    private function registrarArchivoEnDb($repositorio, $file, $id){
        try{
            $repositorio->producto_id = $id;
            $repositorio->url = $file->url; 
            $repositorio->default = $file->default;               
        
            $res = $repositorio->save();
            $mensaje = $res ? "El archivo de imagen sido registrado." : "Ocurrió un error al intentar registrar el archivo.";
            $tipoMensaje = $res ? "success" : "danger";

            return ['mensaje' => $mensaje, 'tipo-mensaje' => $tipoMensaje];

        }catch(Exception $error){ 
            return ['mensaje' => 'Ocurrió un error al intentar subir el archivo: ' .$error->getMessage(), 'tipo-mensaje' => 'danger'];
        }
    }



    //PUT
    private function deleteFile($id)
    {
        try{            
            $repositorio = ImagenesProducto::find($id);
            unlink(storage_path('app/public/productos/'.$repositorio['url']));
            $res = $repositorio->delete();
            $mensaje = $res ? 'Imagén eliminada.' : 'Error al intentar eliminar una imágen';
            $tipoMensaje = $res ? 'success' : 'danger';

            return ['mensaje' => $mensaje, 'tipo-mensaje' => $tipoMensaje];
        }catch(Exception $e){
            return ['mensaje' => 'Error al intentar eliminar una imágen del producto: '.$e, 'tipo-mensaje'=>'danger'];
        }
    }


    



    private function uploadFile($idProd, $path, $destino = 'local', $sobreescribir = false){
        $name = "";
        if(!empty($path)){
            $name = $idProd.'/'.($sobreescribir ? "" : Carbon::now()->second).$path->getClientOriginalName();
            //$this->attributes['afiche'] = $name;    //Asigna automáticamente el nombre al cargar los datos en el controlador, con la función fill($request->all())
            \Storage::disk($destino)->put($name, \File::get($path));            
        }
        return $name;   //En el caso de no cargar los datos con la función fill($request->all()), se debuelve el nombre generado para el archivo. 
    }
}
