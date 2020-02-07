<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Orden;
use App\ItemsOrden;
use Validator;
use DB;

class OrdenesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //return response()->json($request['PayPalData']['TOKEN']);
        //foreach($request['carrito'] as $key=>$value )
        //{
        //    return response()->json($value['cantidad']);
        //}

        $validar = $this->validaDatos($request);
        if($validar->fails()){
            return response()->json(["mensaje"=>"Datos incompletos o no válidos", "errores"=>$validar->errors()]);
        }

        try{
            DB::beginTransaction();

            //Registrando la cabecera de la venta
            $orden = new Orden();
            $orden['token'] = $request['PayPalData']['TOKEN'];
            $res = $orden->fill($request->all())->save();
            if(!$res){
                throw new Exception("Ocurrió un error al intentar registrar la orden");
            }
            $id = $orden->id;                        

            //Registrando los items del detalle de la venta
            foreach($request['carrito'] as $key=>$value )
            {
                $itemsOrden = new ItemsOrden();
                $itemsOrden['orden_id'] = $id; 
                $itemsOrden['producto_id'] = $value['producto']['id'];
                $itemsOrden['precio'] = $value['producto']['precio'];
                $itemsOrden['precio_anterior'] = $value['producto']['precio_anterior'];
                $itemsOrden['cantidad'] = $value['cantidad'];
                $itemsOrden['descuento'] = round($value['producto']['precio'] * 100 / $value['producto']['precio_anterior']);
                $res = $itemsOrden->save();
                if(!$res){
                    throw new Exception("Ocurrió un error al intentar registrar los productos del carrito de compra.");
                }
            }            

            $mensaje = $res ? "La venta ha sido registrada." : "Ocurrio un error al intentar registrar la venta.";
            $tipoMensaje = $res ? "success" : "danger";
            
            DB::commit();
        }catch(Exception $ex){
            $mensaje = "Error".$ex->message();
            $tipoMensaje = "danger";
            $id = -1;
            DB::rollBack();
        }
        return response()->json(["message" => $mensaje, "type_message" => $tipoMensaje, "id" => $id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $orden = Orden::find($id);

        return $orden;
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

    public function getLastOrder(){
        $orden = Orden::orderBy('id', 'desc')->first();

        return $orden;
    }

    private function validaDatos(Request $request){
        //'subtotal','shipping','descuento','user_id','estado_id','tipo_documento'
        $rules = [
            'subtotal' => 'required|integer|min:0|max:9999999999',
            'shipping' => 'required|integer|min:0|max:9999999999',
            'descuento' => 'required|integer|min:0|max:100',
            'user_id' => 'required|exists:users,id',
            'estado_id' => 'required|exists:estados,id',
            'tipo_documento' => 'required|in:B,F,b,f',
        ];

        $messages = [
            'subtotal.required' => 'El campo Sub total no puede estar vacio.',
            'subtotal.integer' => 'El campo Sub total debe ser un nùmero entero.',
            'subtotal.min' => 'El campo Sub total no debe ser menor a cero.',
            'subtotal.max' => 'El campo Sub total no debe ser mayor a 9999999999.',
            
            'shipping.required' => 'El campo shipping no puede estar vacio.',
            'shipping.integer' => 'El campo shipping debe ser un nùmero entero.',
            'shipping.min' => 'El campo shipping no debe ser menor a cero.',
            'shipping.max' => 'El campo shipping no debe ser mayor a 9999999999.',
            
            'descuento.required' => 'El campo descuento no puede estar vacio.',
            'descuento.integer' => 'El campo descuento debe ser un nùmero entero.',
            'descuento.min' => 'El campo descuento no debe ser menor a cero.',
            'descuento.max' => 'El campo descuento no debe ser mayor a 9999999999.',

            'user_id.required' => 'El usuario no ha sido especificado.',
            'user_id.exists' => 'El usuario no existe en la base de datos.',
            
            'estado_id.required' => 'Debe especificar el estado del pedido.',
            'estado_id.exists' => 'El estado del pedido no se encuentra registrado en la base de datos o no existe.',
            
            'tipo_documento.required' => 'Debe especificar el tipo de documento a emitir (Factura o Boleta)',
            'tipo_documento.in' => 'El valor asignado a tipo de documento no es válido',
        ];

        return Validator::make($request->all(), $rules, $messages);
    }
}
