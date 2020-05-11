<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\ExpressCheckout;
use Redirect;

class PaypalController extends Controller
{
    private static $provider;

    public function payment(Request $request)
    {
        //return response()->json(['CARRITO = '.$request['carrito'], 'CLIENTE = '. $request['datosCliente'], 'REQUEST = '.$request]);
        //return response()->json($request->all());

        $dolar = $this->getUSD();
        
        $data = [];
        $items = [];
        $total = 0;
        foreach ($request['carrito'] as $key => $value) {
            array_push($items,
                [
                    'name' => $value['producto']['nombre'],
                    'price' => round($value['producto']['precio']/$dolar, 2),
                    'desc'  => $value['producto']['descripcion'],
                    'qty' => $value['cantidad']
                ]
            );
            $total += round($value['producto']['precio']/$dolar, 2) * $value['cantidad'];
        }

        $data['items'] = $items;
        
        $data['invoice_id'] = $request['codigoOrden'];
        $data['invoice_description'] = "Order #{$data['invoice_id']} Invoice";
        $data['return_url'] = route('payment.success');
        $data['cancel_url'] = route('payment.cancel');
        $data['total'] = $total;
  
        $provider = new ExpressCheckout;
  
        $response = $provider->setExpressCheckout($data);
  
        $response = $provider->setExpressCheckout($data, true);
  
        //return response()->json(['link'=>$response['paypal_link'],'provider'=>$provider]);
        return response()->json(["RESPONSE" => $response, "PROVIDER" => $provider]);
    }
   
    /**
     * Responds with a welcome message with instructions
     *
     * @return \Illuminate\Http\Response
     */
    public function cancel()
    {
        //return response()->json(['mensaje' => 'El proceso de compra ha sido cancelado.','tipo-mensaje' => 'danger']);
        return redirect()->away('http://127.0.0.1:4200/paypal/cancel');
    }
  
    /**
     * Responds with a welcome message with instructions
     *
     * @return \Illuminate\Http\Response
     */
    public function success(Request $request)
    {
        if(isset($request['token']) && isset($request['PayerID']))
        {
            //Grabar datos de la transacción
            return Redirect::to('http://127.0.0.1:4200/paypal/success');
            //return response()->json($request);
        }else{
            return Redirect::to('http://127.0.0.1:4200/paypal/cancel');
            //return response()->json("Algo salió mal");
        }
        
        /*
        $provider = $request->cookie('provider');
        $response = $provider->getExpressCheckoutDetails($request->token);
  
        if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
            return response()->json('Your payment was successfully. You can create success page here.');
        }
  
        dd('Something is wrong.'); 
        */
    }



    public function getUSD()
    {
        // Get cURL resource
        $curl = curl_init();
        // Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'https://mindicador.cl/api',
            CURLOPT_USERAGENT => 'Codular Sample cURL Request'
        ]);
        // Send the request & save response to $resp
        $resp = curl_exec($curl);
        if (!curl_exec( $curl)) {
            dd('Error: "' . curl_error($curl) . '" - Code: ' . curl_errno($curl));
        }
        // Close request to clear up some resources
        curl_close($curl);

        //dd();
        return json_decode($resp)->dolar->valor;
    }

}