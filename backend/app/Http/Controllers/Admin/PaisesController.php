<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Pais;

class PaisesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $paises = Pais::all();
        
        return response()->json($paises->ToArray());
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

    public function filtrar($filtro)
    {
        if($filtro == "")
        {
            $paises = Pais::all();       
        }else{
            $paises = Pais::where('nombre','Like','%'.$filtro.'%')->get();
        }

        return response()->json($paises->ToArray());
    }
}
