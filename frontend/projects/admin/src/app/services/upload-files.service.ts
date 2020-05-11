import { Injectable, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwToolbarMixedModesError } from '@angular/material';
import { ConstService } from './const.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  private endPoint = "upload-file";

  constructor(
    private httpClient: HttpClient,
    private _constantes: ConstService
    ) { }

  insert(archivo: FormData, prodId: number){
    return this.httpClient.post<any>(`${this._constantes.servidorEndPoint}${this.endPoint}`, {file: archivo, producto_id: prodId});
  }

  update(archivo: FormData, id: number, prodId: number){
    return this.httpClient.put<any>(`${this._constantes.servidorEndPoint}${this.endPoint}/${id}`, {file: archivo, producto_id: prodId});
  }

}
