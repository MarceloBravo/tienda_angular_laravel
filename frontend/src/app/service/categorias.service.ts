import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../class/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private endPoint: string = 'http://127.0.0.1:8000/api/admin/categorias'

  constructor(private httpClient: HttpClient) { }

  private getHeader(){
    return new HttpHeaders({'Content-Type':'application/json'});
  }

  get(page: number){
    console.log(this.endPoint + '/' + page);
    return this.httpClient.get(this.endPoint + '/pag/' + page);
  }

  getAll(){
    return this.httpClient.get(this.endPoint + '-all');
  }

  find(id: number){
    return this.httpClient.get(this.endPoint + '/' + id);
  }

  insert(categoria: Categoria){
    return this.httpClient.post(this.endPoint, categoria, {headers: this.getHeader()});
  }

  update(id: number, categoria: Categoria){
    return this.httpClient.put(this.endPoint + '/' + id, categoria, {headers: this.getHeader()});
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + '/' + id, {headers: this.getHeader()});
  }

  filter(texto: string, page: number){
    return this.httpClient.get(this.endPoint + '/filtro/' + texto + '/' + page);
  }
}
