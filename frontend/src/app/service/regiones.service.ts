import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionesService {
  private endPoint: string = "http://127.0.0.1:8000/api/admin/regiones";

  constructor(private httpClient: HttpClient) { }

  public obtenerPorPais(idPais: number){
    return this.httpClient.get(this.endPoint + "/pais/" + idPais);
  }
}
