import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
  private endPoint: string = "http://127.0.0.1:8000/api/admin/provincias";

  constructor(private httpClient: HttpClient) { }

  obtenerPorRegion(idRegion: number){
    return this.httpClient.get(this.endPoint + "/region/" + idRegion);
  }
}
