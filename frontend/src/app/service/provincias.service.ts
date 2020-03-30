import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Provincia } from '../class/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
  private endPoint: string = "http://127.0.0.1:8000/api/admin/provincias";

  constructor(private httpClient: HttpClient) { }

  private getHeader(){
    return new HttpHeaders({'Content-Type':'application/json'});
  }

  obtenerPorRegion(idRegion: number){
    return this.httpClient.get(this.endPoint + "/region/" + idRegion);
  }
  
  get(page: number){
    return this.httpClient.get(this.endPoint + '/pag/' + page);
  }

  getAll(){
    return this.httpClient.get(this.endPoint);
  }

  find(id: number){
    return this.httpClient.get(this.endPoint + '/' + id);
  }
  
  insert(provincia: Provincia){
    return this.httpClient.post(this.endPoint, provincia, {headers: this.getHeader()});
  }

  update(id: number, provincia: Provincia){
    return this.httpClient.put(this.endPoint + '/' + id, provincia , {headers: this.getHeader()});
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + '/' + id, {headers: this.getHeader()});
  }

  filter(texto: string, page: number){
    return this.httpClient.get(this.endPoint + '/filtrar/' + texto + '/' + page); 
  }
}
