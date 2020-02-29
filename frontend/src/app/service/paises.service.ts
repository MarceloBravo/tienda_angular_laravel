import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pais } from 'src/app/class/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private endPoint: string = "http://127.0.0.1:8000/api/admin/paises";

  constructor(private httpClient: HttpClient) { }

  private getHeaders(){
    return new HttpHeaders({'Content-type':'application/json'});
  }

  getAll(){
    return this.httpClient.get(this.endPoint + '-all');
  }

  get(pag:number = 0){
    return this.httpClient.get(this.endPoint + '/pag/' + pag);
  }

  find(id: number){
    return this.httpClient.get(this.endPoint + '/' + id);
  }

  filter(texto: string, pag: number = 0){
    return this.httpClient.get(this.endPoint + '/filtrar/' + texto + '/' + pag);
  }

  insert(pais: Pais){
    return this.httpClient.post(this.endPoint, pais, {headers: this.getHeaders()});
  }

  update(id: number, pais: Pais){
    return this.httpClient.put(this.endPoint + '/' + id, pais, {headers: this.getHeaders()});
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + '/' + id, {headers: this.getHeaders()});
  }
  
}
