import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuariosInterfaces } from '../interfaces/usuariosInterface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private endPoint: string = "http://127.0.0.1:8000/api/admin/usuarios";
  
  constructor(private httpClient: HttpClient) { }

  private headers(){
    var header = new HttpHeaders({'Content-type':'application/json'});
    return header;
  }

  insert(usuario: usuariosInterfaces){
    return this.httpClient.post(this.endPoint, usuario, {headers:this.headers()});
  }


  
}
