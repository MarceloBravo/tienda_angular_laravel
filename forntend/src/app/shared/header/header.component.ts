import { Component, OnInit } from '@angular/core';
import { UserLoggedInData } from '../../interfaces/userLogguedInData';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cantProductos: number = 0;

  constructor(private _carritoService: CarritoService) {}

  ngOnInit() {
    this.actualizarCantidad();
  }

  private actualizarCantidad(){
    this.cantProductos = this._carritoService.getCantProductos();
  }


  //Muestra u oculta el carrito de compras (Desliza el carrito de compras desde el borde izquierdo de la pantalla hacia el centro y viceversa)
  public showCart()
  {
    var cart = <HTMLDivElement>document.getElementById('right-side-cart-area');
  
    console.log(cart.id);
    for(var x = 800;x >= 0;x-=5)
    {
      cart.style.right = (x).toString();      
    }
  
  }
}
