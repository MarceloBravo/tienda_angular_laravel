<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Pais;
use Validator;

class PaisesController extends Controller
{
    private $rowsByPage = 10;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($pag = 0)
    {
        $allPaises = Pais::orderBy('nombre','asc');
        
        $paises = $allPaises->skip($pag * $this->rowsByPage)
                            ->take($this->rowsByPage)
                            ->get();
        
        return response()->json(['data'=>$paises->ToArray(),'rows'=>Count($allPaises->get()), 'page'=>$pag, 'rowsByPage'=>$this->rowsByPage]);
    }


    public function getAll(){
        $paises = Pais::all();

        return response()->json($paises->toArray());
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
        $validacion = $this->validaDatos($request, null);
        if($validacion->fails())
        {
            return response()->json(["mensaje"=>"Datos incompletos o no válidos", "errores"=>$validacion->errors(),'tipo-mensaje'=>'danger']);
        }

        $pais = new Pais();
        $result = $pais->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido ingresado." : "Ocurrión un error al intentar ingresar el registro.";
        $tiypoMensaje = $result ? "success" : "danger";
        $nuevoId = $result ? $pais->id : -1;

        return response()->json(['mensaje' => $mensaje , 'tipo-mensaje' => $tiypoMensaje, "id"=>$nuevoId]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $pais = Pais::find($id);

        return response()->json($pais);
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
        $validacion = $this->validaDatos($request, $id);
        if($validacion->fails())
        {
            return response()->json(["mensaje"=>"Datos incompletos o no válidos", "errores"=>$validar->errors(),'tipo-mensaje'=>'danger']);
        }

        $pais = Pais::find($id);
        $result = $pais->fill($request->all())->save();
        $mensaje = $result ? "El registro ha sido actualizado." : "Ocurrió un error al intentar actualizar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

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
        $pais = Pais::find($id);
        $result = $pais->delete();
        $mensaje = $result ? "El registro ha sido eliminado." : "Ocurrió un error al intentar eliminar el registro.";
        $tipoMensaje = $result ? "success" : "danger";

        return response()->json(['mensaje' => $mensaje, 'tipo-mensaje' => $tipoMensaje]);
    }


    public function filtrar($filtro, $pag = 0)
    {
        $allPaises = Pais::orderBy('nombre','asc');

        if($filtro == "")
        {
            $paises = $allPaises->skip($pag * $this->rowsByPage)
                                ->take($this->rowsByPage)
                                ->get();
        }else{
            $paises = $allPaises->where('nombre','Like','%'.$filtro.'%')
                            ->orderBy('nombre','asc')
                            ->skip($pag * $this->rowsByPage)
                            ->take($this->rowsByPage)
                            ->get();
        }

        return response()->json(['data'=>$paises->ToArray(), 'rows'=>count($allPaises->get()),'page'=>$pag, 'rowsByPage'=>$this->rowsByPage]);
    }


    private function validaDatos(Request $request, $id){
        $rules = [
            'nombre'=>'required|min:2|max:50|unique:paises,nombre,'.$id
        ];

        $messages = [
            'nombre.required' => 'El nombre del pais es obligatorio.',
            'nombre.min' => 'El nombre del pais debe tener almenos 2 carácteres.',
            'nombre.max' => 'El nombre del pais debe tener un máximo de 50 carácteres.',
            'nombre.unique' => 'El nombre del pais ya se encuentra registrado. Ingresa otro nombre.',
        ];

        return Validator::make($request->all(), $rules, $messages);
    }
}
