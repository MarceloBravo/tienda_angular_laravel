import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { UserLoggedInData } from 'src/app/interfaces/userLogguedInData';
import { Router } from '@angular/router';
import { Pais } from 'src/app/class/pais';
import { Region } from 'src/app/class/region';
import { Comuna } from 'src/app/class/comuna';
import { Provincia } from 'src/app/class/provincia';
import { Ciudad } from 'src/app/class/ciudad';
import { PaisesService } from 'src/app/service/paises.service';
import { RegionesService } from 'src/app/service/regiones.service';
import { ProvinciasService } from 'src/app/service/provincias.service';
import { ComunasService } from 'src/app/service/comunas.service';
import { CiudadesService } from 'src/app/service/ciudades.service';
import { PaisesInterface } from '../../interfaces/PaisesInterface';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { usuariosInterfaces } from 'src/app/interfaces/usuariosInterface';
import { MessagesService } from 'src/app/service/messages.service';
import { ProductoInterface } from 'src/app/interfaces/productoInterface';
import { ItemCarrito } from 'src/app/class/item-carrito';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  public usuario: UserLoggedInData = {
    status: null,
    data: {
        token: null,
        usuario:{
            id: null,
            nombre: null,
            a_paterno: null,
            a_materno: null,
            email: null,
            nickname: null,
            password: null,
            confirm_password: null,
            direccion: null,
            fono: null,
            rol_id: null,
            ciudad_id: null,
            created_at: null,
            updated_at: null,
            deleted_at: null
        },
        rol: null,
        ciudad: null
    }
  };
  public paises: Pais[];
  public regiones: Region[];
  public provincias: Provincia[];
  public comunas: Comuna[];
  public ciudades: Ciudad[];
  private ciudad: Ciudad = new Ciudad();
  private carrito: ItemCarrito[];
  private total: number;

  constructor(
    private _loginService: LoginService,
    private _paisesService: PaisesService,
    private _regionesService: RegionesService,
    private _provinciasService: ProvinciasService,
    private _comunasService: ComunasService,
    private _ciudadesService: CiudadesService,
    private _messageService: MessagesService,
    private _carritoService: CarritoService,
    private router: Router
    ) { 
      this.cargarDatos();       
    }

  ngOnInit() {
  }


  private async cargarDatos(){
    await this.getDatosUsuario();
    await this.obtenerCiudad(this.usuario.data.usuario.ciudad_id); 
    this.cargarPaises();
    this.cargarRegiones(this.ciudad.pais_id);
    this.cargarProvincias(this.ciudad.region_id);
    this.cargarComunas(this.ciudad.provincia_id);
    this.cargarCiudades(this.ciudad.comuna_id);
    this.cargarCarrito();
  }


  private async obtenerCiudad(id: number){    
    await this._ciudadesService.get(id).toPromise().then((res: Ciudad)=>{
      this.ciudad = res;
    },(error)=>{
      this._messageService.showModalMessage('Error', error);
    })
  }

  private getDatosUsuario(){
    this.usuario = this._loginService.getUser();
    if(this.usuario == null){
      this.router.navigate(["/login"]);
    }
  }


  public cargarPaises(){
    this._paisesService.getAll().subscribe(
      (resp: PaisesInterface[])=>{
        var pais: Pais = new Pais();
        pais.id = null;
        pais.nombre = resp.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        resp.push(pais);
        this.paises = resp.sort((x, y) => x.id - y.id);
    })
  }

  
  public cargarRegiones(idPais?: number){
    if(idPais == null)
    {
      var pais = <HTMLSelectElement>document.getElementById('pais');    
      idPais = parseInt(pais.value);
    }

    this._regionesService.obtenerPorPais(idPais).subscribe(
      (res: Region[])=>{
        var msg: Region = new Region();        
        msg.id = null;
        msg.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        res.push(msg);

        this.regiones = res.sort((x, y)=> x.id - y.id);        
      },(error)=>{
        this._messageService.showModalMessage('Error', error);
      });
  }


  public cargarProvincias(idRegion?: number){
    if(idRegion == null)
    {
      var regiones = <HTMLSelectElement>document.getElementById('region');
      idRegion =  parseInt(regiones.value);
    }
    
    this._provinciasService.obtenerPorRegion(idRegion).subscribe(
      (res: Provincia[])=>{
        var provincias: Provincia[] = res;
        var msg: Provincia = new Provincia();
        msg.id = null;
        msg.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        provincias.push(msg);
        this.provincias = provincias.sort((x, y) => x.id - y.id);
    });
  }


  public cargarComunas(idProvincia?: number){
    if(idProvincia == null)
    {
      var provincias = <HTMLSelectElement>document.getElementById('provincia');
      idProvincia = parseInt(provincias.value);
    }
    
    this._comunasService.obtenerPorProvincia(idProvincia).subscribe(
      (res: Comuna[])=>{
        var comunas: Comuna[] = res;
        var msg: Comuna = new Comuna();
        msg.id = null;
        msg.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        comunas.push(msg);
        this.comunas = comunas.sort((x, y)=> x.id - y.id);
    });
  }


  public cargarCiudades(idComuna?: number){
    if(idComuna == null)
    {
      var comunas = <HTMLSelectElement>document.getElementById('comuna');
      idComuna = parseInt(comunas.value);
    }
    
    this._ciudadesService.obtenerPorComuna(idComuna).subscribe(
      (res: Ciudad[])=>{
        var ciudades: Ciudad[] = res;
        var msg: Ciudad = new Ciudad();
        msg.id = null;
        msg.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        ciudades.push(msg);
        this.ciudades = res.sort((x, y)=>x.id - y.id);
    });
  }

  public cargarCarrito(){
    this.carrito = Array();
    this.total = 0;
    var carrito: {[id:number]: ItemCarrito} = this._carritoService.getCarrito();
    for(var item in carrito){
      this.carrito.push(carrito[item]);
      this.total += carrito[item].producto.precio * carrito[item].cantidad;
    }
    //console.log(this.carrito);
  }
}
