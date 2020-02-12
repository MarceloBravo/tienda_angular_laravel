<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Freshwork\Transbank\WebpayNormal;
use Freshwork\Transbank\RedirectorHelper;
use Freshwork\Transbank\WebpayPatPass;
use Redirect;
//https://packagist.org/packages/freshwork/transbank    Implementar WebPay
//https://www.transbankdevelopers.cl/documentacion/como_empezar#ambiente-de-integracion Datos de prueba WebPay

class WebPayController extends Controller
{
    public function initTransaction(Request $request, WebpayNormal $webpayNormal)
	{   
        $webpayNormal->addTransactionDetail($request['monto'], 'order-' . rand(1000, 9999));
		$response = $webpayNormal->initTransaction(route('checkout.webpay.response'), route('checkout.webpay.finish')); 
		// Probablemente también quieras crear una orden o transacción en tu base de datos y guardar el token ahí.
        
        return response()->json(['url' => $response->url, 'token' => $response->token]);
        //$res = RedirectorHelper::redirectHTML($response->url, $response->token);
    }

    public function response(WebpayPatPass $webpayPatPass)  
	{  
      $result = $webpayPatPass->getTransactionResult();  
      return Redirect::To('http://127.0.0.1:4200/webpay/success');
      //return response()->json($result);
	  //session(['response' => $result]);  
	  // Revisar si la transacción fue exitosa ($result->detailOutput->responseCode === 0) o fallida para guardar ese resultado en tu base de datos. 
	  
    }


    public function finish(){
        //dd($_POST, session('response'));  
	    //Acá buscar la transacción en tu base de datos y ver si fue exitosa o fallida, para mostrar el mensaje de gracias o de error según corresponda
    }
}
