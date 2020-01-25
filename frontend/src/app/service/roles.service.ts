import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  endPoint: string = "http://127.0.0.1:8000/api/admin/roles";

  constructor(private httpClient: HttpClient) { }

  getDefault(){
    return this.httpClient.get(this.endPoint + "-default");
  }
}
