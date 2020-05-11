<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Empresa;
use Validator;

class EmpresaController extends Controller
{
    private $rowsByPage = 10;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($page = 0)
    {
        $allEmpresas = Empresa::join('ciudades','empresa.ciudad_id','=','ciudades.id')
                                ->join('comunas','ciudades.comuna_id','=','comunas.id')
                                ->join('provincias','comunas.provincia_id','=','provincias.id')
                                ->join('regiones','provincias.region_id','=','regiones.id')
                                ->join('paises','regiones.pais_id','=','paises.id')
                                ->select(
                                    'empresa.*',
                                    'ciudades.nombre as ciudad',
                                    'comunas.id as comuna_id',
                                    'comunas.nombre as ciudad',
                                    'provincias.id as provincia_id',
                                    'provincias.nombre as provincia',
                                    'regiones.id as region_id',
                                    'regiones.nombre as region',
                                    'paises.id as pais_id',
                                    'paises.nombre as pais'
                                    )
                                ->orderBy('empresa.nombre','asc');
        $totFilas = count($allEmpresas->get());
        
        $empresas = $allEmpresas->skip($this->rowsByPage * $page)
                                ->take($this->rowsByPage)
                                ->get();


        return response()->json(['data'=>$empresas->ToArray(), 'rows'=> $totFilas, 'page' => $page, 'rowsByPage' => $this->rowsByPage]);
    }

    public function getAll(){
        $empresas = Empresa::all();

        return response()->json($empresas->toArray());
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
        $validaciones = $this->validaDatos($request, null);
        if($validaciones->fails()){
            return response()->json(['mensaje'=>'Existen campos incompletos y/o no validos.','errores' => $validaciones->errors()]);
        }

        $empresa = new Empresa();
        $res = $empresa->fill($request->all())->save();
        $mensaje = $res ? "El registro ha sido ingresado" : "Ocurrió un error al intentar ingresar el registro.";
        $tipoMensaje = $res ? "success" : "danger";
        $id = $res ? $empresa->id : -1;

        return response()->json(['mensaje' => $mensaje, 'tipo-mensaje' => $tipoMensaje, 'id' => $id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $empresa = Empresa::join('ciudades','empresa.ciudad_id','=','ciudades.id')
                            ->join('comunas','ciudades.comuna_id','=','comunas.id')
                            ->join('provincias','comunas.provincia_id','=','provincias.id')
                            ->join('regiones','provincias.region_id','=','regiones.id')
                            ->join('paises','regiones.pais_id','=','paises.id')
                            ->select(
                                'empresa.*',
                                'ciudades.nombre as ciudad',
                                'comunas.id as comuna_id',
                                'comunas.nombre as ciudad',
                                'provincias.id as provincia_id',
                                'provincias.nombre as provincia',
                                'regiones.id as region_id',
                                'regiones.nombre as region',
                                'paises.id as pais_id',
                                'paises.nombre as pais'
                                )
                                ->find($id);

        return response()->json($empresa);
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
        $validaciones = $this->validaDatos($request, null);
        if($validaciones->fails()){
            return response()->json(['mensaje'=>'Existen campos incompletos y/o no validos.','errores' => $validaciones->errors()]);
        }

        $empresa = Empresa::find($id);
        $res = $empresa->fill($request->all())->save();
        $mensaje = $res ? "El registro ha sido actualizado" : "Ocurrió un error al intentar actualizar el registro.";
        $tipoMensaje = $res ? "success" : "danger";

        return response()->json(['mensaje' => $mensaje, 'tipo-mensaje' => $tipoMensaje]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $empresa = Empresa::find($id);
        $res = $empresa->delete();
        $mensaje = $res ? "El registro ha sido eliminado" : "Ocurrió un error al intentar eliminar el regsitro.";
        $tipoMensaje = $res ? "success" : "danger";

        return response()->json(['mensaje' => $mensaje, 'tipo-mensaje' => $tipoMensaje]);
    }


    public function first(){
        $empresa = Empresa::first();
        $empresa->ciudad = $empresa->ciudad();

        return response()->json($empresa);
    }

    
    public function default()
    {
        $empresa = Empresa::where('predeterminada','=',true)->first();
        $empresa->ciudad = $empresa->ciudad();

        return response()->json($empresa);
    }


    public function filtrar($texto, $page = 0)
    {
        $allEmpresas = Empresa::join('ciudades','empresa.ciudad_id','=','ciudades.id')
                                ->join('comunas','ciudades.comuna_id','=','comunas.id')
                                ->join('provincias','comunas.provincia_id','=','provincias.id')
                                ->join('regiones','provincias.region_id','=','regiones.id')
                                ->join('paises','regiones.pais_id','=','paises.id')
                                ->select(
                                    'empresa.*',
                                    'ciudades.nombre as ciudad',
                                    'comunas.id as comuna_id',
                                    'comunas.nombre as ciudad',
                                    'provincias.id as provincia_id',
                                    'provincias.nombre as provincia',
                                    'regiones.id as region_id',
                                    'regiones.nombre as region',
                                    'paises.id as pais_id',
                                    'paises.nombre as pais'
                                    )
                                ->orderBy('empresa.nombre','asc');

        if(isset($texto) && $texto != ""){
            $allEmpresas = $allEmpresas->where('empresa.nombre','Like','%'.$texto.'%')
                                ->orWhere('ciudades.nombre','Like','%'.$texto.'%')
                                ->orWhere('comunas.nombre','Like','%'.$texto.'%')
                                ->orWhere('provincias.nombre','Like','%'.$texto.'%')
                                ->orWhere('regiones.nombre','Like','%'.$texto.'%')
                                ->orWhere('paises.nombre','Like','%'.$texto.'%');
        }

        $totFilas = count($allEmpresas->get());

        $empresas = $allEmpresas->skip($this->rowsByPage * $page)
                                ->take($this->rowsByPage)
                                ->get();
        

        return response()->json(['data' => $empresas, 'rows' => $totFilas, 'page' => $page, 'rowsByPage' => $this->rowsByPage]);
    }
    
    


    private function validaDatos(Request $request, $id)
    {
        $rules = [
            'rut' => 'required|min:10|max:13|unique:empresa,id,'.$id,
            'nombre' => 'required|min:3|max:100|unique:empresa,id,'.$id,
            'direccion' => 'required|min:5|max:255',
            'ciudad_id' => 'required|exists:ciudades,id',
            'fono' => 'required|min:9|max:20',
            'email' => 'required|min:5|max:100',
            'giro' => 'required|min:10|max:500',
            'logo' => 'min:10|max:500'
        ];

        $messages = [
            'rut.required' => 'El campo rut es obligatorio.',
            'rut.min' => 'El rut debe tener como mínimo 10 carácteres, incluidos puntos y guión. Ingresa un rut más largo.',
            'rut.max' => 'El rut debe tener un máximo 13 carácteres, incluidos puntos y guión. Ingresa un rut más corto.',
            'rut.unique' => 'El rut ya se encuentra ingresado previamente. Ingresa un rut diferente.',

            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.min' => 'El campo nombre debe tener un mínimo de 3 carácteres. Ingresa un nombre más largo.',
            'nombre.max' => 'El campo nombre debe tener un máximo de 100 carácteres. Ingresa un nombre más corto.',
            'nombre.unique' => 'El nombre ingresado ya se encuentra en uso. Ingresa un nombre diferente.',

            'direccion.required' => 'La dirección es obligatoria.',
            'direccion.min' => 'La dirección debe tener como mínimo 5 carácteres. Ingresa una dirección más larga.',
            'direccion.max' => 'La dirección debe tener como máximo 255 carácteres. Ingresa una dirección más corta.',

            'ciudad_id.required' => 'Debes seleccionar una ciudad.',
            'ciudad_id.exists' => 'La ciudad seleccionada no existe o no es válida.',

            'fono.required' => 'El campo fono es obligatorio.',
            'fono.min' => 'El fono debe tener almenos 9 carácteres. Ingresa un fono más largo.',
            'fono.max' => 'El fono debe tener un máximo de 20 carácteres. Ingresa un fono más corto.',

            'email.required' => 'El campo email es obligatorio.',
            'email.min' => 'El email debe tener almenos 5 carácteres. Ingresa un email más largo.',
            'email.max' => 'El email debe tener un máximo de 100 carácteres. Ingresa un email más corto.',

            'giro.required' => 'El campo giro es obligatorio.',
            'giro.min' => 'El giro debe tener almenos 10 carácteres. Ingresa un giro más largo.',
            'giro.max' => 'El giro debe tener un máximo de 500 carácteres. Ingresa un giro más corto.',

            'logo.min' => 'El logo debe tener almenos 10 carácteres. Ingresa un logo más largo.',
            'logo.max' => 'El logo debe tener un máximo de 500 carácteres. Ingresa un logo más corto.',
        ];

        
        return Validator::make($request->all(), $rules, $messages);
    }
}
