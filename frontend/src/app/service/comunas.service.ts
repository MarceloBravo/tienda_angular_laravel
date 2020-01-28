import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunasService {
  endPoint: string = "http://127.0.0.1:8000/api/admin/comunas";

  constructor(private httpClient: HttpClient) { }

  obtenerPorProvincia(idProvincia: number){
    return this.httpClient.get(this.endPoint + "/provincia/" + idProvincia);
  }

  getAll(){
    return this.httpClient.get(this.endPoint);
  }

  get(id: number){
    return this.httpClient.get(this.endPoint + '/' + id);
  }
}
