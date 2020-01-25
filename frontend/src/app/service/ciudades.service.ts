import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  endPoint: string = "http://127.0.0.1:8000/api/admin/ciudades";

  constructor(private httpClient: HttpClient) { }

  obtenerPorComuna(idComuna: number){
    return this.httpClient.get(this.endPoint + "/comuna/" + idComuna);
  }
}
