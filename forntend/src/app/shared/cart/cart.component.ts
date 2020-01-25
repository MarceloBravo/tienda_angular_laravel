import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cantProductos: number = 0;

  constructor(private _carritoService: CarritoService) { }

  ngOnInit() {
    this.cantidadProductos();
  }

  private cantidadProductos(){
    this.cantProductos = this._carritoService.getCantProductos();
  }
}
