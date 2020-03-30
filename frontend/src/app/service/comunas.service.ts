import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comuna } from '../class/comuna';

@Injectable({
  providedIn: 'root'
})
export class ComunasService {
  endPoint: string = "http://127.0.0.1:8000/api/admin/comunas";

  constructor(private httpClient: HttpClient) { }

  private getHeaders(){
    return new HttpHeaders({'Content-Type':'application/json'});
  }

  obtenerPorProvincia(idProvincia: number){
    return this.httpClient.get(this.endPoint + "/provincia/" + idProvincia);
  }

  getAll(){
    return this.httpClient.get(this.endPoint);
  }

  get(page: number){
    return this.httpClient.get(this.endPoint + '/pag/' + page);
  }

  find(id: number){
    return this.httpClient.get(this.endPoint + '/' + id);
  }

  filter(texto: string, pag: number){
    console.log(this.endPoint + '/filtrar/' + texto + '/' + pag);
    return this.httpClient.get(this.endPoint + '/filtrar/' + texto + '/' + pag);
  }

  insert(comuna: Comuna){
    return this.httpClient.post(this.endPoint, comuna, {headers: this.getHeaders()});
  }

  update(id: number, comuna: Comuna){
    return this.httpClient.put(this.endPoint + '/' + id, comuna, {headers: this.getHeaders()});
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + '/' + id, {headers: this.getHeaders()});
  }

  provinciasComuna(idProvincia: number){
    return this.httpClient.get(this.endPoint + '/provincias/' + idProvincia);
  }
}
