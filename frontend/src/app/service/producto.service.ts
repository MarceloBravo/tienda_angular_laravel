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
    return new HttpHeaders({'Accept':'application/json'});
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
    return this.http.put(this.endPoint + 'admin/productos/' + id, producto, {headers: this.getHeaders()});
  }

  delete(id: number){
    return this.http.delete(this.endPoint + 'admin/productos/' + id, {headers: this.getHeaders()});
  }
}
