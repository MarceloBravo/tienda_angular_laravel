import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private endPoint: string = "http://127.0.0.1:8000/api/admin/paises";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get(this.endPoint);
  }
}
