import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  show(){
    var divSpinner = <HTMLDivElement>document.getElementById('div-loading-spinner');
    divSpinner.style.display = 'block';
  }

  hide(){
    var divSpinner = <HTMLDivElement>document.getElementById('div-loading-spinner');
    divSpinner.style.display = 'none';
  }
}
