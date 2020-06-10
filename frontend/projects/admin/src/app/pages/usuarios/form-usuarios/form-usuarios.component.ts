import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessagesService } from 'src/app/service/messages.service';
import { Usuario } from '../../../clases/usuario';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Rol } from 'src/app/class/rol';
import { Ciudad } from 'src/app/class/ciudad';
import { RolesService } from 'src/app/service/roles.service';
import { CiudadesService } from 'src/app/service/ciudades.service';
import { Pais } from 'src/app/class/pais';
import { Region } from 'src/app/class/region';
import { Provincia } from '../../../../../../../src/app/class/provincia';
import { Comuna } from 'src/app/class/comuna';
import { PaisesService } from 'src/app/service/paises.service';
import { RegionesService } from 'src/app/service/regiones.service';
import { ProvinciasService } from 'src/app/service/provincias.service';
import { ComunasService } from 'src/app/service/comunas.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit {
  private usuario: Usuario = new Usuario();
  public id: number;
  public roles: Rol[];
  public paises: Pais[];
  public regiones: Region[];
  public provincias: Provincia[];
  public comunas: Comuna[];
  public ciudades: Ciudad[];
  public userForm:  FormGroup = new FormGroup({
    id: new FormControl(),
    rut: new FormControl(),
    nombre: new FormControl(),
    a_paterno: new FormControl(),
    a_materno: new FormControl(),
    email: new FormControl(),
    nickname: new FormControl(),
    password: new FormControl(),
    direccion: new FormControl(),
    fono: new FormControl(),
    rol_id: new FormControl(),
    ciudad_id: new FormControl(),
    token: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),
    rol: new FormControl(),
    ciudad: new FormControl(),    
    pais_id: new FormControl(),
    region_id: new FormControl(),
    provincia_id: new FormControl(),
    comuna_id: new FormControl()
  });

  constructor(
    private _userService: UsuariosService,
    private _spinnerService: SpinnerService,
    private _messagesService: MessagesService,
    private _rolesService: RolesService, 
    private _paisesService: PaisesService,
    private _regionesService: RegionesService,
    private _provinciasService: ProvinciasService,
    private _comunasService: ComunasService,
    private _ciudadesService: CiudadesService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    let id:string = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargarRoles();
    this.cargarPaises();
    if(id !== undefined || id === ''){
      this.id = parseInt(id);
      this.buscar();      
    }else{
      this.id == 0;
      this.initForm();
    }
  }

  ngOnInit(): void {
  }

  private initForm(){
    this.userForm = this.fb.group({
      id: [this.usuario.id,[Validators.min(0)]],
      rut: [this.usuario.rut,[Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      nombre: [this.usuario.nombre,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      a_paterno: [this.usuario.a_paterno,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      a_materno: [this.usuario.a_materno,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [this.usuario.email,[Validators.required, Validators.email, Validators.maxLength(255)]],
      nickname: [this.usuario.nickname,[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: [this.usuario.password,[Validators.minLength(6), Validators.maxLength(20)]],
      direccion: [this.usuario.direccion,[Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      fono: [this.usuario.fono,[Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      rol_id: [this.usuario.rol_id,[Validators.required, Validators.min(0)]],
      pais_id: this.usuario.pais_id,
      region_id: this.usuario.region_id,
      provincia_id: this.usuario.provincia_id,
      comuna_id: this.usuario.comuna_id,
      ciudad_id: this.usuario.ciudad_id
    });
    /*    
    const invalid = [];
    const controls = this.userForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log(this.userForm.value, this.userForm.valid, invalid);
    */    
  }

  private buscar(){
    this._spinnerService.show();
    this._userService.find(this.id).subscribe(
      async (res: Usuario)=>{
        this.usuario = res;
        this.initForm();
        await this.listadoRegiones(res.pais_id);
        await this.listadoProvincias(res.region_id);
        await this.listadoComunas(res.provincia_id);
        await this.listadoCiudades(res.comuna_id);
        if(res.id !== undefined){
          let divAction = <HTMLDivElement>document.getElementById('action-title');
          divAction.innerText = 'Editando...';
        }
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      });
  }

  private cargarRoles(){
    this._spinnerService.show();
    this._rolesService.getAll().subscribe(
      (res: Rol[])=>{        
        let item: Rol = new Rol();
        item.id = null;
        item.nombre = res.length > 0 ? '-- Seleccione --' : '-- No se ha encontrado registros --';
        res.push(item);

        this.roles = res.sort((a, b) => a.id - b.id);
        this._spinnerService.hide();
      },(error)=>{
        this.handlerError(error);
      });
  }

  
  private cargarPaises(){
    this._spinnerService.show();
    this._paisesService.getAll().subscribe(
      (res: Pais[])=>{
        let item = new Pais();
        item.id = null;
        item.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se han encontrado registros --";        
        res.push(item);
        
        this.paises = res.sort((a, b) => a.id - b.id);        
        this._spinnerService.hide();
      },(error)=>{
        this.handlerError(error);
      });
  }


  public async cargarRegiones(){
    let pais = <HTMLSelectElement>document.getElementById('pais_id');
    let paisId = parseInt(pais.value);
    await this.listadoRegiones(paisId);
  }


  public async cargarProvincias(){
    let region = <HTMLSelectElement>document.getElementById('region_id');
    let regionId = parseInt(region.value);
    await this.listadoProvincias(regionId);
  }


  public async cargarComunas(){
    let provincia = <HTMLSelectElement>document.getElementById('provincia_id');
    let provinciaId = parseInt(provincia.value);
    await this.listadoComunas(provinciaId);
  }


  public async cargarCiudades(){
    let comuna = <HTMLSelectElement>document.getElementById('comuna_id');
    let comunaId = parseInt(comuna.value);
    this.listadoCiudades(comunaId); 
  }


  private async listadoRegiones(paisId: number, defaultValue: number = 0){
    this._spinnerService.show();
    this._regionesService.obtenerPorPais(paisId).subscribe(
      (res: Region[])=>{
        let item = new Region();
        item.id = null;
        item.nombre = res.length > 0 ? "-- Seleccione --" : " -- No se han encontrado registros --";
        res.push(item);

        this.regiones = res.sort((a, b) => a.id - b.id);
        this._spinnerService.hide();
      },(error)=>{
        this.handlerError(error);
      });
  }

  private async listadoProvincias(regionId: number, defaultValue: number = 0){
    this._spinnerService.show();
    this._provinciasService.obtenerPorRegion(regionId).subscribe(
      (res: Provincia[])=>{
        let item = new Provincia();
        item.id = null;
        item.nombre = res.length > 0 ? "-- Seleccione --" : " -- No se han encontrado registros --";        
        res.push(item);
        res = res.sort((a, b) => a.id - b.id);
        this.provincias = res;
        this._spinnerService.hide();
      },(error)=>{
        this.handlerError(error);
      });
  }
  

  private async listadoComunas(provinciaId: number, defaultValue: number = 0){
    this._spinnerService.show();
    this._comunasService.obtenerPorProvincia(provinciaId).subscribe(
      (res: Comuna[])=>{
        let item = new Comuna();
        item.id = null;
        item.nombre = res.length > 0 ? "-- Seleccione --" : " -- No se han encontrado registros --";        
        res.push(item);
        res = res.sort((a, b) => a.id - b.id);

        this.comunas = res;
        this._spinnerService.hide();
      },(error)=>{
        this.handlerError(error);
      });
  }

  private async listadoCiudades(comunaId: number, defaultValue: number = 0){
    this._spinnerService.show();
    this._ciudadesService.obtenerPorComuna(comunaId).subscribe(
      (res: Ciudad[])=>{
        let item = new Ciudad();
        item.id = null;
        item.nombre = res.length > 0 ? "-- Seleccione --" : " -- No se han encontrado registros --";        
        res.push(item);
        res = res.sort((a, b) => a.id - b.id);
        this.ciudades = res;
        this._spinnerService.hide();
      },(error)=>{
        this.handlerError(error);
      });
  }
  

  grabar(){
    if(window.confirm("Desea grabar el registro?")){
      if(this.id !== null){
        this.actualizar();
      }else{
        this.insertar();
      }
    }
  }


  private insertar(){
    this._spinnerService.show();
    this._userService.insert(this.userForm.value).subscribe(
      (res: string[])=>{
        this.handlerSuccess(res);
      },(error)=>{
        this.handlerError(error);
      });
  }


  private actualizar(){
    this._spinnerService.show();
    this._userService.update(this.id, this.userForm.value).subscribe(
      (res: string[])=>{
        this.handlerSuccess(res);
      },(error)=>{
        this.handlerError(error);
      });
  }


  eliminar(){
    if(window.confirm("¿Desea eliminar el usuario?")){
      this._spinnerService.show();
      this._userService.delete(this.id).subscribe(
        (res: string[])=>{
          this.handlerSuccess(res);
        },(error)=>{
          this.handlerError(error);
        });
      }
  }

  
  private handlerError(error: any){
    console.log(error);
    let msg = error.errors !== undefined ? error.errors.message : error.message;
    this._messagesService.mostrarMensaje(msg, 'danger');
    this._spinnerService.hide();
  }


  private handlerSuccess(res: string[]){
    console.log(res);
    this._messagesService.showModalMessage(res['mensaje'], res['tipoMensaje']);
    this._spinnerService.hide();
    this.router.navigate(['/admin/usuarios']);
  }
}
