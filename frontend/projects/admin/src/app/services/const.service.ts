import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConstService {
  public servidorEndPoint: string = "http://127.0.0.1:8000/api/";

  constructor() { }

  public generateHeders(){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return headers;
  }
}
