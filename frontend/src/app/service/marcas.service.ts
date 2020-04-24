import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marca } from '../class/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private endPoint: string = "http://127.0.0.1:8000/api/";

  constructor(private httpClient: HttpClient) { }

  private getHeader(){
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

  get(page: number){
    return this.httpClient.get(this.endPoint + 'admin/marcas/pag/' + page);
  }

  getAll(){
    return this.httpClient.get(this.endPoint + 'admin/marcas-all');
  }

  filter(texto: string, page: number){
    return this.httpClient.get(this.endPoint + 'admin/marcas/filtrar/' + texto + '/' + page);
  }

  find(id: number){
    return this.httpClient.get(this.endPoint + 'admin/marcas/' + id);
  }

  insert(marca: Marca){
    return this.httpClient.post(this.endPoint + 'admin/marcas', marca, {headers: this.getHeader()} )
  }

  update(id: number, marca: Marca){
    return this.httpClient.put(this.endPoint + 'admin/marcas/' + id, marca, {headers: this.getHeader()} )
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + 'admin/marcas/' + id, {headers: this.getHeader()} )
  }
}
