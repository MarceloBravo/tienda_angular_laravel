import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from '../class/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  endPoint: string = "http://127.0.0.1:8000/api/admin/roles";

  constructor(private httpClient: HttpClient) { }

  
  private getHeaders(){
    const header = new HttpHeaders({'Content-type':'application/json'});
    return header;
  }

  getDefault(){
    return this.httpClient.get(this.endPoint + "-default");
  }

  
  get(pag: number){
    return this.httpClient.get(this.endPoint + '/pag/' + pag);
  }

  getAll(){
    return this.httpClient.get(this.endPoint + '-all');
  }

  find(id: number){
    return this.httpClient.get(this.endPoint + '/' + id);
  }

  insert(rol: Rol){
    return this.httpClient.post(this.endPoint, rol, {headers: this.getHeaders()});
  }

  update(id: number, rol: Rol){
    return this.httpClient.put(this.endPoint + '/' + id, rol, {headers: this.getHeaders()} );
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + '/' + id, {headers: this.getHeaders()});
  }

  filter(texto: string,  pag: number = 0){
    return this.httpClient.get(this.endPoint + '/filtrar/' + texto + '/' + pag);
  }
}
