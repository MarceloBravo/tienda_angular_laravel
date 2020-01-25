import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { PaisesService } from '../service/paises.service';
import { PaisesInterface } from '../interfaces/PaisesInterface';
import { Pais } from '../class/pais';
import { Region } from '../class/region';
import { RegionesService } from '../service/regiones.service';
import { ProvinciasService } from '../service/provincias.service';
import { Provincia } from '../class/provincia';
import { ComunasService } from '../service/comunas.service';
import { Comuna } from '../class/comuna';
import { Ciudad } from '../class/ciudad';
import { CiudadesService } from '../service/ciudades.service';
import { Credenciales } from '../class/credenciales';
import { usuariosInterfaces } from '../interfaces/usuariosInterface';
import { UsuariosService } from '../service/usuarios.service';
import { responseInterface } from '../interfaces/responseInterface';
import { RolesService } from '../service/roles.service';
import { Rol } from '../class/rol';
import { UserLoggedInData } from '../interfaces/userLogguedInData';
import { Route, Router } from '@angular/router';
import { MessagesService } from '../service/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credentials: Credenciales = new Credenciales();
  public token: string;
  public paises: PaisesInterface[];
  public regiones: Region[];
  public provincias: Provincia[];
  public comunas: Comuna[];
  public ciudades: Ciudad[];

  defaultPais: Pais = new Pais();
  defaultRegion: Region = new Region();
  defaultProvincia: Provincia = new Provincia();
  defaultComuna: Comuna = new Comuna();
  defaultCiudad: Ciudad = new Ciudad();
  response: responseInterface;

  
  usuario: usuariosInterfaces = {
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
  }
  
  constructor(
    private _loginService: LoginService,
    private _paisesService: PaisesService,
    private _regionesService: RegionesService,
    private _provinciasService: ProvinciasService,
    private _comunasService: ComunasService,
    private _ciudadesService: CiudadesService,
    private _usuariosService: UsuariosService,
    private _rolesService: RolesService,
    private _mensajesService: MessagesService,                        
    private router: Router
    ) { 
      this.cargarPaises();
    }

  ngOnInit() {
    
  }


  //Realiza la identificación del usuario y obtiene los datos del usuario y el token generado por el BackEnd
  public async userLogin() {
    var email: HTMLInputElement = <HTMLInputElement>document.getElementById('email');
    var password: HTMLInputElement = <HTMLInputElement>document.getElementById('password');
    this.credentials.email = email.value;
    this.credentials.password = password.value;

    this._loginService.loginUser(this.credentials).subscribe(
      (resp: UserLoggedInData) => {
        this.token = resp.data.token;
        if(typeof(Storage) !== "undefined")
        {
          this._loginService.setToken(resp.data.token);
          this._loginService.setUser(<UserLoggedInData><unknown>resp);
          this._mensajesService.mostrarMensaje("Estás logueado...", "success");
          this.router.navigate(["/"]);
        }else{
          this._mensajesService.mostrarMensaje("Estás logueado pero tus datos no están almacenados en sesión", "warning");
        }
        
      },
      (error: any) => {
        console.log(error);
        this._mensajesService.mostrarMensaje(error.error.message, "danger");
      })
  }

  //Registra un nuevo usuario en el sistema
  public async registrarUsuario(){
    if(confirm("¿Desea crear su cuenta de usuario?")){
      
      try{
        var rol: Rol = await <Rol><unknown>this.getRol();
        
        if(rol == null){
          throw new Error("No se pudo configurar el rol");
        }
        this.usuario.rol_id = rol.id;

        this._usuariosService.insert(this.usuario).subscribe(
          (res: responseInterface)=>{
            this.response = res;
            console.log(res);
            var email = <HTMLInputElement>document.getElementById('email');
            var password = <HTMLInputElement>document.getElementById('password');
            email.value = this.usuario.email;
            password.value = this.usuario.password;
            this.userLogin();

        });  
      }catch(error){
        console.log(error);
        this._mensajesService.mostrarMensaje(error.error.message, "danger");
      }
    }
    
  }

  private async getRol(){
    var rol = null;
    await this._rolesService.getDefault().toPromise().then(
      (res: Rol) => {
        rol = res;
      });
      return rol;
  }

  public cargarPaises(){
    this._paisesService.getAll().subscribe((res: PaisesInterface[]) =>{
      this.defaultPais.id = null;
      if(res.length > 0)
      {        
        this.defaultPais.nombre = "-- Seleccione --";
      }else{
        this.defaultPais.nombre = "-- No existen registros --";
      }
      res.push(this.defaultPais);

      this.paises = res.sort((a, b) => a.id - b.id);      
    })
  }
  
  public cargarRegiones(){
    var pais = <HTMLSelectElement>document.getElementById('pais');
    this._regionesService.obtenerPorPais(parseInt(pais.value)).subscribe(
      (res: Region[]) => {
        this.defaultRegion.id = null;
        if(res.length > 0)
        {
          this.defaultRegion.nombre = "-- Seleccione --";          
        }else{
          this.defaultRegion.nombre = "-- No se encontraron registros --";
        }
        res.push(this.defaultRegion);
        this.regiones = res.sort((a,b)=> a.id - b.id);
      });
  }

  public cargarProvincias(){
    var region = <HTMLSelectElement>document.getElementById('region');
    this._provinciasService.obtenerPorRegion(parseInt(region.value)).subscribe(
      (res: Provincia[])=>{
        this.defaultProvincia.id = null;
        if(res.length > 0){          
          this.defaultProvincia.nombre = "-- Seleccione --";          
        }else{
          this.defaultProvincia.nombre = "-- No se encontraron registros --";
        }
        res.push(this.defaultProvincia);
        this.provincias = res.sort((a, b) => a.id - b.id);
    })
  }


  public cargarComunas(){
    var provincias = <HTMLSelectElement>document.getElementById('provincia');
    this._comunasService.obtenerPorProvincia(parseInt(provincias.value)).subscribe(
      (res: Comuna[])=>{
        this.defaultComuna.id = null;
        this.defaultComuna.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        res.push(this.defaultComuna);
        this.comunas = res.sort((a, b) => a.id  - b.id);
    })
  }


  public cargarCiudades(idComuna: number){
    var comuna = <HTMLSelectElement>document.getElementById('comuna');
    this._ciudadesService.obtenerPorComuna(parseInt(comuna.value)).subscribe(
      (res: Ciudad[])=>{
        this.defaultCiudad.id = null;
        this.defaultCiudad.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        res.push(this.defaultCiudad);
        this.ciudades = res.sort((a, b) => a.id - b.id);
      });
  } 
}
