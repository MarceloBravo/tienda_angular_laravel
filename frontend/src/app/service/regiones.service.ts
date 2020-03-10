import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Region } from 'src/app/class/region';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RegionesService {
  private endPoint: string = "http://127.0.0.1:8000/api/admin/regiones";

  constructor(private httpClient: HttpClient) { }

  private getHeaders(){
    return  new HttpHeaders({'Content-Type':'application/json'});
  }

  public obtenerPorPais(idPais: number){
    return this.httpClient.get(this.endPoint + "/pais/" + idPais);
  }

  get($pag: number){
    return this.httpClient.get(this.endPoint + '/pag/' + $pag);
  }

  getAll(){
    return this.httpClient.get(this.endPoint + '-all');
  }

  filter(texto: string, pag: number){
    return this.httpClient.get(this.endPoint + '/filtrar/' + texto + '/' + pag);
  }
  
  find(id: number){ //* Corregir en el Front Office cambió de get a find*/
    return this.httpClient.get(this.endPoint + '/' +id);
  }

  getRegionesPais(idPais: number){  //Retorna el listado de regiones de un pais determinado
    return this.httpClient.get(this.endPoint + '/pais/' + idPais);
  }

  insert(region: Region){
    return this.httpClient.post(this.endPoint, region,  {headers: this.getHeaders()})
  }

  update(id: number, region: Region){
    return this.httpClient.put(this.endPoint + '/' + id, region, {headers: this.getHeaders()});
  }

  delete(id: number){
    return this.httpClient.delete(this.endPoint + '/' + id, {headers: this.getHeaders()});
  }

  

  /*
  
  Route::get('admin/regiones/pais/{pais_id}', 'Admin\RegionesController@regionesPais');
  */
}
