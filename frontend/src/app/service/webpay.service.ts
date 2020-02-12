import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebpayService {
  private endPoint: string = "http://127.0.0.1:8000/api/webpay"

  constructor(private httpClient: HttpClient) { }

  private getHedaers(){
    var header = new HttpHeaders({'Content-Type':'application/json'});
    return header;
  }

  paymentWebPay(monto: number){
    return this.httpClient.get(this.endPoint + '/payment?monto=' + monto);
  }

  redirectToWebPay(url: string, token: string){
    var data = {'TBK_TOKEN': token};
    return this.httpClient.post(url, data, {headers: this.getHedaers()})
  }
}
