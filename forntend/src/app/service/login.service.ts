import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { loginInterface } from 'src/app/interfaces/logininterface';
import { UserLoggedInData } from '../interfaces/userLogguedInData';
//https://desarrolloweb.com/articulos/practica-observables-angular.html (Practicas de observables en Angular)

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endPoint: string = "http://127.0.0.1:8000/api/login";  
  private token: string;
  private datosUsuario: UserLoggedInData;

  constructor(private httpClient: HttpClient) { }

  setToken(token: string){
    this.token = token;
  }

  getToken(){
    return sessionStorage.getItem("token");
  }

  setUser(usuario: UserLoggedInData){
    this.datosUsuario = usuario;
  }

  getUser(){
    return this.datosUsuario;
  }

  private headers(){
    let header = new HttpHeaders({'Content-type':'application/json'});
    return header;
  }
  

  loginUser(loginInterface: loginInterface){
    return this.httpClient.post(this.endPoint, loginInterface, {headers: this.headers()});
  }

  
  public showUserInfo(){
    if(typeof(this.getUser()) != "undefined"){
      var user: UserLoggedInData = this.getUser(); 
      var span = <HTMLSpanElement>document.getElementById("userName");
      var divLogin = <HTMLSpanElement>document.getElementById("divLogin");
      var divUser = <HTMLSpanElement>document.getElementById("divUserName");
      divLogin.style.display = "none";
      divUser.style.display = "block";

      span.innerHTML = user.data.usuario.nombre.split(" ")[0];
    }
  }
}
