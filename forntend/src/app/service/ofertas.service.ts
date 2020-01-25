import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  private endPoint: string = "http://127.0.0.1:8000/api/";

  constructor(private httpClient: HttpClient) { }

  ofertas(){
    return this.httpClient.get(this.endPoint + "admin/ofertas");
  }
}
