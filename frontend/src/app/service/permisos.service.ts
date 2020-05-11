import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Permisos } from '../class/permisos';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private endPoint: string = 'http://127.0.0.1:8000/api/admin/permisos'

  constructor(private httpClient: HttpClient) { }

  private getHeaders(){
    return new HttpHeaders({'Content-Type':'application/json'});
  }

  getByRol(idRol: number){
    return this.httpClient.get(this.endPoint + '/rol/' + idRol);
  }

  get(page: number){
    return this.httpClient.get(this.endPoint + '/pag/' + page);    
  }

  getAll(){
    return this.httpClient.get(this.endPoint + '-all');
  }

  find(id:number){
    return this.httpClient.get(this.endPoint + '/' + id);
  }

  save(permisos: Permisos[]){
    return this.httpClient.post(this.endPoint, permisos, {headers: this.getHeaders()} );
  }

  insert(){

  }

  update(){

  }

  delete(){

  }

  filter(texto: string, page: number){
    return this.httpClient.get(this.endPoint + '/filtro/' + texto + '/' + page);
  }
}
