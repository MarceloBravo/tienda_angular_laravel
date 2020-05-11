import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/productoInterface';
import { Producto } from '../class/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  endPoint: string = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }

  private getHeaders(){
    return new HttpHeaders({'Content-Type':'application/json'});
  }

  private getHeaders2(){
    return new HttpHeaders({'Content-Type': 'multipart/form-json'});  
  }

  get(page: number){
    return this.http.get(this.endPoint + 'admin/productos/pag/' + page);
  }

  getAll(){
    return this.http.get(this.endPoint + "admin/productos");
  }

  find(id: number){
    return this.http.get(this.endPoint + "admin/productos/" + id);
  }

  filter(texto: string, page: number){
    return this.http.get(this.endPoint + 'admin/productos/' + texto + '/' + page);
  }

  insert(producto: Producto){
    return this.http.post(this.endPoint + 'admin/productos', producto, {headers: this.getHeaders()});
  }

  update(id: number, producto: Producto){
    return this.http.post<any>(this.endPoint + 'admin/productos/' + id + '?_method=PUT', JSON.stringify(producto), {headers: this.getHeaders2()});
  }

  delete(id: number){
    return this.http.delete(this.endPoint + 'admin/productos/' + id, {headers: this.getHeaders()});
  }
}
