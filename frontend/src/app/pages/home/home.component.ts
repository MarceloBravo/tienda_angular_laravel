import { Component, OnInit, NgModule } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OfertasService } from '../../service/ofertas.service';
import { ofertaInterface } from 'src/app/interfaces/ofertasInterface';
import { HomeService } from '../../service/home.service';
import { imagenesHome } from '../../interfaces/imagenesHome';
import { UserLoggedInData } from 'src/app/interfaces/userLogguedInData';
import { LoginService } from 'src/app/service/login.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { ProductoInterface } from 'src/app/interfaces/productoInterface';
import { ProductoService } from 'src/app/service/producto.service';
import { ItemCarrito } from '../../class/item-carrito';
import { MessagesService } from '../../service/messages.service';
import { Router } from '@angular/router';

//Carrusel owl multicolumna Anguklar + Bootstrap
//https://therichpost.com/how-to-implement-owl-carousel-slider-in-angular-8/

//Opciones de configuración carrusel owl Angular
//https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig ]
})
export class HomeComponent implements OnInit {
  public ofertas: ofertaInterface[];
  public imagenesSeccion1: imagenesHome[];
  public imagenesSeccion2: imagenesHome[];  

  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,    
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: "5000",
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  //constructor() { 
  constructor(
      config: NgbCarouselConfig, 
      public _ofertas: OfertasService,
      public _home: HomeService,
      private _loginService: LoginService,
      private _carritoService: CarritoService,
      private _productoService: ProductoService,
      private _mensajeService: MessagesService,
      private router: Router
    ) { 
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    this.cargarProductos();
  }

  ngOnInit() {
    this._carritoService.actualizaInfoCarrito();
    this._loginService.showUserInfo();
  }

  //Carga las imágenes y las ofertas a mostrar en el home
  public cargarProductos()
  {
    this.imagenesSeccion(1);
    this.imagenesSeccion(2);
    this.Ofertas();
  }

  //Obtiene las ofertas las guarda en la variable ofertas la cual es iterada en el html
  private Ofertas()
  {
    this._ofertas.ofertas().subscribe(
      (res: ofertaInterface[])=>{
        this.ofertas = res;
      }
    );
  }


  //Obtiene las imágenes de la sección de la página especificada y las guarda en la variable 
  //imagenesSeccion# la cual es iterada en el html
  private imagenesSeccion(seccion){
    this._home.imagenesSeccion(seccion).subscribe(
      (res: imagenesHome[]) =>{
        if(seccion == 1){
          this.imagenesSeccion1 = res
        }else{
          this.imagenesSeccion2 = res
        }
      },
      (error)=>{
        console.log(error);
        alert(error);
      });
  }

  public async agregarAlCarro(id: number, cantidad: number){
    

    //Validando quie el usuario se encuentre logueado previamente
    if(this._loginService.getUser() == null)
    {
      this.router.navigate(["/login"]); //En caso de no estar logueado, el usuario será redireccionado a la pantalla de login
    }else{
      var producto: ProductoInterface =  await this.buscarProducto(id);

      if(producto != undefined)
      {
        var res = await this._carritoService.agregaItem(producto, cantidad);
        this._carritoService.mostrarCantProductos();

        var mensaje: string = res ? "El producto ha sido agregado al carrito. Tienes "+this._carritoService.getCantProductos()+" producto(s) en tu carrito." : "Ocurrió un error al intentar agregar el producto. Intente nuevamente.";
        var tipoMensaje: string = res ? "success" : "danger";
        this._mensajeService.mostrarMensaje(mensaje, tipoMensaje);
        //this._carritoService.actualizaInfoCarrito();
        alert(mensaje);
      }

    }
  }
  

  private async  buscarProducto(id: number){
    var producto: ProductoInterface;
    await this._productoService.get(id).toPromise().then(
      (res :ProductoInterface) => {
        producto = res;
    });
    return producto;
  }

}
