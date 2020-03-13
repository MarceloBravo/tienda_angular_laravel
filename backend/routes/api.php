<?php
//https://codebriefly.com/laravel-5-6-jwt-auth-api/  (Configuración para la identificación de usuario por token)
//https://medium.com/@experttyce/c%C3%B3mo-crear-un-api-rest-con-laravel-5-7-y-jwt-token-94b79c533c6d (Configuración para la identificación de usuario por token + middleware)
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/
//Login tienda (Front Office)
Route::post('login', 'API\AuthController@login');
Route::middleware('jwt.auth')->group(function(){
    Route::get('logout', 'API\AuthController@logout');
});


//Login administración de tienda (Back Office)
Route::post('admin-login','Admin\LoginController@login');
Route::middleware('jwt.auth')->group(function(){
    Route::get('logout', 'Admin\LoginController@logout');
});


Route::resource('admin/paises', 'Admin\PaisesController');
Route::get('admin/paises/filtrar/{filtro}/{pag}', 'Admin\PaisesController@filtrar');
Route::get('admin/paises/pag/{pag}', 'Admin\PaisesController@index');
Route::get('admin/paises-all', 'Admin\PaisesController@getAll');

Route::resource('admin/regiones', 'Admin\RegionesController');
Route::get('admin/regiones/filtrar/{filtro}/{pag}', 'Admin\RegionesController@filtrar');
Route::get('admin/regiones/pag/{pag}','Admin\RegionesController@index');
Route::get('admin/regiones-all','Admin\RegionesController@getAll');
Route::get('admin/regiones/pais/{pais_id}', 'Admin\RegionesController@regionesPais');


Route::resource('admin/provincias','Admin\ProvinciasController');
Route::get('admin/provincias/filtrar/{filtro}/{pag}','Admin\ProvinciasController@filtrar');
Route::get('admin/provincias/pag/{pag}','Admin\ProvinciasController@index');
Route::get('admin/provincias-all','Admin\ProvinciasController@getAll');
Route::get('admin/provincias/region/{region_id}','Admin\ProvinciasController@provinciasRegion');


Route::resource('admin/comunas','Admin\ComunasController');
Route::get('admin/comunas/filtrar/{filtro}','Admin\ComunasController@filtrar');
Route::get('admin/comunas/provincia/{provincia_id}','Admin\ComunasController@comunasProvincia');

Route::resource('admin/ciudades', 'Admin\CiudadesController');
Route::get('admin/ciudades/filtrar/{filtro}','Admin\CiudadesController@filtrar');
Route::get('admin/ciudades/comuna/{comuna_id}','Admin\CiudadesController@ciudadesComuna');

Route::resource('admin/roles','Admin\RolesController');
Route::get('admin/roles/filtrar/{filtro}/{pag}','Admin\RolesController@filtrar');
Route::get('admin/roles/pag/{pag}','Admin\RolesController@index');
Route::get('admin/roles-all','Admin\RolesController@getAll');
Route::get('admin/roles-default','Admin\RolesController@getDefaultRol');

Route::resource('admin/usuarios','Admin\UsersController');
Route::get('admin/usuarios/filtrar/{filtro}','Admin\UsersController@filtrar');

Route::resource('admin/pantallas','Admin\PantallasController');
Route::get('admin/pantallas/filtrar/{filtro}/{pag}','Admin\PantallasController@filtrar');
Route::get('admin/pantallas/pag/{pag}','Admin\PantallasController@index');
Route::get('admin/pantallas-all','Admin\PantallasController@getAll');


Route::resource('admin/marcas','Admin\MarcasController');
Route::get('admin/marcas/filtrar/{filtro}', 'Admin\MarcasController@filtrar');

Route::resource('admin/productos','Admin\ProductosController');
Route::get('admin/productos/filtrar/{filtro}','Admin\ProductosController@filtrar');

Route::resource('admin/ofertas','Admin\OfertasController');

Route::get('home','HomeController@index');
Route::get('home/imagenes/{seccion}','HomeController@imagenesSeccion');

Route::resource('ordenes', 'Admin\OrdenesController');
Route::get('ultima-orden','Admin\OrdenesController@getLastOrder');

Route::resource('estados_compras','Admin\EstadosController');
Route::get('estados_compras_inicial','Admin\EstadosController@getFirstState');

Route::resource('empresa','Admin\EmpresaController');
Route::get('empresa_default','Admin\EmpresaController@first');

Route::resource('admin/menus', 'Admin\MenusController');
Route::get('admin/menus/filtrar/{id}/{pag}', 'Admin\MenusController@filtrar');
Route::get('admin/menus/pag/{pag}', 'Admin\MenusController@index');
Route::get('admin/menus-all', 'Admin\MenusController@getAll');

//Rutas PayPal
Route::post('paypal','PaypalController@payment');
Route::get('paypal/cancel','PaypalController@cancel')->name('payment.cancel');
Route::get('paypal/success','PaypalController@success')->name('payment.success');
//Route::get('payment/status','PaypalController@getPaymentStatus')->name('payment.status');
Route::get('usd', 'PaypalController@getUSD');

//Rutas WebPay
Route::get('/webpay/payment', 'WebPayController@initTransaction')->name('checkout');  
Route::post('/checkout/webpay/response', 'WebPayController@response')->name('checkout.webpay.response');  
Route::post('/checkout/webpay/finish', 'WebPayController@finish')->name('checkout.webpay.finish');

