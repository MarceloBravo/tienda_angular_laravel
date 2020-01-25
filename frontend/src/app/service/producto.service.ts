import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/productoInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  endPoint: string = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.endPoint + "admin/productos");
  }

  get(id: number){
    return this.http.get(this.endPoint + "admin/productos/" + id);
  }
}
