import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ciudad } from '../class/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  endPoint: string = "http://127.0.0.1:8000/api/admin/ciudades";

  constructor(private httpClient: HttpClient) { }

  obtenerPorComuna(idComuna: number){
    return this.httpClient.get(this.endPoint + "/comuna/" + idComuna);
  }

  private getHeaders(){
    return new HttpHeaders({'Content-Type':'application/json'});
  }

  get(page:number){
    return this.httpClient.get(this.endPoint + '/pag/' + page);
  }

  getAll(){
    return this.httpClient.get(this.endPoint + '-all');
  }

  find(id: number){
    return this.httpClient.get(this.endPoint + '/' + id);
  }

  insert(ciudad: Ciudad){
    return this.httpClient.post(this.endPoint, ciudad, {headers: this.getHeaders() });
  }

  update(id: number, ciudad: Ciudad){
    return this.httpClient.put(this.endPoint + '/' + id, ciudad, {headers: this.getHeaders()});
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + '/' + id, {headers: this.getHeaders()});
  }

  filter(texto: string, page: number){
    return this.httpClient.get(this.endPoint + '/filtrar/' + texto + '/' + page);
  }

}
