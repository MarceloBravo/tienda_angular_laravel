import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { empresaInterface } from '../interfaces/empresaInterface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private endPoint: string = "http://127.0.0.1:8000/api/";

  constructor(private httpClient: HttpClient) { }

  private getHeaders(){
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

  getDefault(){
    return this.httpClient.get(this.endPoint + "admin/empresa_default");
  }

  get(page: number){
    return this.httpClient.get(this.endPoint + 'admin/empresas/pag/' + page);
  }

  getAll(){
    return this.httpClient.get(this.endPoint + 'admin/empresas-all');
  }

  find(id: number){
    return this.httpClient.get(this.endPoint + 'admin/empresas/' + id);
  }

  insert(empresa: empresaInterface){
    return this.httpClient.post(this.endPoint + 'admin/empresas', empresa, {headers: this.getHeaders()});
  }

  update(id: number, empresa: empresaInterface){
    return this.httpClient.put(this.endPoint + 'admin/empresas/' + id, empresa, {headers: this.getHeaders()} );
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + 'admin/empresas/' + id, {headers: this.getHeaders()});
  }

  filter(texto: string, page: number){
    return this.httpClient.get(this.endPoint + 'admin/empresas/filtro/' + texto + '/' + page);
  }
}
