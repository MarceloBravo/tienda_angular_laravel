import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private endPoint: string = "http://127.0.0.1:8000/api/home";

  constructor(private httpClient: HttpClient) { }

  configHome(){
    return this.httpClient.get(this.endPoint);
  }

  imagenesSeccion(seccion: number){
    return this.httpClient.get(this.endPoint + "/imagenes/" + seccion);
  }
}
