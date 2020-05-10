import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../clases/usuario';
import { ConstService } from './const.service';
import { loginInterface } from '../interfaces/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  public  usuario: Usuario;
  private loginData: loginInterface = {
    nickname: null,
    password: null,
    token: null,
    remember: false
  };

  constructor(    
    private httpClient: HttpClient,
    private _const: ConstService,
    private router: Router
    ) { }

  private login(nickname: string, password: string ){
    return this.httpClient.post(this._const.servidorEndPoint + 'admin-login', {nickname: nickname, password: password}, {headers: this._const.generateHeders()});
  }


  public async autenticar(nickname: string, password: string, remember: boolean): Promise<string>{
    
    console.log(nickname, password);
    var res =  await this.login(nickname, password).toPromise().then(
      (res: any)=>{      
        
        this.usuario = res.data.usuario;
        this.usuario.token = res.data.oken;
        
        this.loginData.nickname = nickname;
        this.loginData.password = password;
        this.loginData.token = res.data.token;
        this.loginData.remember = remember;

        sessionStorage.setItem('login', JSON.stringify(this.loginData));          
        if(remember)
        {          
          localStorage.setItem('login', JSON.stringify(this.loginData));
        }

        return 'Ok';
        
      }).catch(error=>{
        console.log(error);
        var msg = error.error != undefined ? error.error.message : error.message;
        return msg;
      });

      return res;
  }
}
