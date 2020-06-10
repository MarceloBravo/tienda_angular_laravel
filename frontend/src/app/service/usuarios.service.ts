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

  get(page: number){
    return this.httpClient.get(this.endPoint + `/pag/${page}`);
  }

  getAll(){
    return this.httpClient.get(this.endPoint + `-all`);
  }
  
  find(id: number){
    return this.httpClient.get(this.endPoint + `/${id}`);
  }

  insert(usuario: usuariosInterfaces){
    return this.httpClient.post(this.endPoint, usuario, {headers:this.headers()});
  }
  
  update(id: number, usuario: usuariosInterfaces){
    return this.httpClient.put(this.endPoint + `/${id}`, usuario, {headers: this.headers()});
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + `/${id}`, {headers: this.headers()});
  }

  getUserByEmail(email: string){
    return this.httpClient.get(this.endPoint + '/email/' + email);
  }

  filter(texto: string, pag: number){
    return this.httpClient.get(this.endPoint + `/filtrar/${texto}/${pag}`);
  }

}
