<?php
//https://codebriefly.com/laravel-5-6-jwt-auth-api/  (Configuración para la identificación de usuario por token)
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use JWTAuth;
use Validator;

class AuthController extends Controller
{
    /**
     * API Login, on success return JWT Auth token
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];
        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json([
                'status' => 'error', 
                'message' => $validator->messages()
            ]);
        }

        try {
            // Attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
            //if (! $token = JWTAuth()->attempt($credentials)) {
                return response()->json([
                    'status' => 'error', 
                    'message' => 'Usuario y o contraseña no válidos.'
                ], 401);
            }
        } catch (JWTException $e) {
            // Something went wrong with JWT Auth.
            return response()->json([
                'status' => 'error', 
                'message' => 'Ocurrió un error al intentar iniciar cesión. Intentelo nuevamente.'
            ], 500);
        }
        $user = \App\User::where("email","=",$request->email)
                    ->select("users.*")
                    ->first();

        // All good so return the token
        return response()->json([
            'status' => 'success', 
            'data'=> [
                'token' => $token,
                // You can add more details here as per you requirment. 
                'usuario' => $user,
                'rol' => $user->rol()[0]->nombre,
                'ciudad' => $user->ciudad()[0]->nombre
            ]
        ]);
    }

    /**
     * Logout
     * Invalidate the token. User have to relogin to get a new token.
     * @param Request $request 'header'
     */
    public function logout(Request $request) 
    {
        // Get JWT Token from the request header key "Authorization"
        $token = $request->header('Authorization');

        // Invalidate the token
        try {
            JWTAuth::invalidate($token);
            return response()->json([
                'status' => 'success', 
                'message'=> "Has cerrado cessión correctamente."
            ]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json([
              'status' => 'error', 
              'message' => 'Ocurrió un error al intentar cerrar cesión.'
            ], 500);
        }
    }
/*
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ]);
    }
*/
}
