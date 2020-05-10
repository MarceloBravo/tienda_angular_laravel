import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/service/carrito.service';
import { ItemCarrito } from 'src/app/class/item-carrito';
import { PartialObserver } from 'rxjs';
//https://desarrolloweb.com/articulos/practica-observables-angular.html (Practicas de observables en Angular)

@Component({
  selector: 'app-right-side-cart',
  templateUrl: './right-side-cart.component.html',
  styleUrls: ['./right-side-cart.component.css']
})
export class RightSideCartComponent implements OnInit {
  //public cantProductos: number = 0;
  public carrito: ItemCarrito[];

  constructor(private _carritoService: CarritoService) { }

  ngOnInit() {
    

    //Consumiendo el observable para recuperar el carrito de compras actualizado
    this._carritoService.getCarrito$().subscribe(
      (res: {[id: number]: ItemCarrito}) => {    

        //Convirtiendo en array la respuesta del observable
        var items: ItemCarrito[] = Array();
        for(let key in res){
          items.push(res[key]);
        }
        console.log(items);
        this.carrito = items;

        //this.cantProductos = this._carritoService.cantProductos();
    
        this._carritoService.actualizaInfoCarrito();
    });

    
  }

  public hiddenCart()
  {
    var cart = <HTMLDivElement>document.getElementById('right-side-cart-area');
    
    //console.log(cart.id);
    for(var x = 0;x <= 800;x+=5)
    {
      cart.style.right = (x*-1).toString() + "px";      
    }
  
  }

  public quitarDelCarrito(id: number, cantidad: number){
    var msg: string = cantidad > 1 ? '¿Desea quitar una unidad de éste producto?' : '¿Desea quitar éste producto de su carrito?';
    if(confirm(msg))
    {
      this._carritoService.removerItem(id);
    }
  }
}
