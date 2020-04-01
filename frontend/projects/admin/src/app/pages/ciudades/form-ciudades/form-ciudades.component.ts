import { Component, OnInit } from '@angular/core';
import { CiudadesService } from 'src/app/service/ciudades.service';
import { MessagesService } from 'src/app/service/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciudad } from 'src/app/class/ciudad';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/service/spinner.service';
import { Pais } from 'src/app/class/pais';
import { Region } from 'src/app/class/region';
import { Provincia } from 'src/app/class/provincia';
import { Comuna } from 'src/app/class/comuna';
import { ComunasService } from '../../../../../../../src/app/service/comunas.service';
import { ProvinciasService } from 'src/app/service/provincias.service';
import { RegionesService } from 'src/app/service/regiones.service';
import { PaisesService } from 'src/app/service/paises.service';

@Component({
  selector: 'app-form-ciudades',
  templateUrl: './form-ciudades.component.html',
  styleUrls: ['./form-ciudades.component.css']
})
export class FormCiudadesComponent implements OnInit {
  public ciudad: Ciudad = new Ciudad();
  private id: number = 0;
  public formCiudad: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    comuna_id: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),
    provincia_id: new FormControl(),
    region_id: new FormControl(),
    pais_id: new FormControl()
  });
  public paises: Pais[];
  public regiones: Region[];
  public provincias: Provincia[];
  public comunas: Comuna[];
  
  constructor(
    private _ciudadesService: CiudadesService,
    private _comunasService: ComunasService,
    private _provinciasService: ProvinciasService,
    private _regionesService: RegionesService,
    private _paisesService: PaisesService,    
    private _mensajesService: MessagesService,
    private actvatedRoute: ActivatedRoute,
    private _spinnerService: SpinnerService,
    private router: Router,
    private fb: FormBuilder,
  ) { 
    this._mensajesService.ocultarMensaje();
    var id: string = this.actvatedRoute.snapshot.paramMap.get('id');  //Obtiene el id desde la url
    if(id !== '0'){
      this.id = parseInt(id);
      this.buscar();
    }else{
      this.inicializarFormulario();
    }
    this.cargarPaises();
    
  }

  ngOnInit() {
  }
  
  private inicializarFormulario(){
    this.formCiudad = this.fb.group({
      id: [this.ciudad.id, [Validators.min(1)]],
      nombre: [this.ciudad.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      comuna_id: [this.ciudad.comuna_id, [ Validators.required, Validators.min(1)]],
      created_at: [this.ciudad.created_at],
      updated_at: [this.ciudad.updated_at],
      deleted_at: [this.ciudad.deleted_at],
      provincia_id: [this.ciudad.provincia_id, [Validators.required, Validators.min(1)]],
      region_id: [this.ciudad.region_id, [Validators.required, Validators.min(1)]],
      pais_id: [this.ciudad.pais_id, [Validators.required, Validators.min(1)]]
    })
  }


  private buscar(){
    this._spinnerService.show();
    this._ciudadesService.find(this.id).subscribe(
      (res: Ciudad)=>{
        this.ciudad = res;
        this.inicializarFormulario();
        this.cargarRegiones(this.ciudad.pais_id);
        this.cargarProvincias(this.ciudad.region_id);
        this.cargarComunas(this.ciudad.provincia_id);
        var info = <HTMLDivElement>document.getElementById('action-title');
        info.innerText = 'Editando...';
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    )
  }


  private cargarPaises(){
    this._spinnerService.show();
    this._paisesService.getAll().subscribe(
      (res: Pais[])=>{
        this.paises = res;
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  cargarRegiones(idPais: number = 0){
    console.log(idPais);
    if(idPais == 0){
      console.log('PAIS',idPais)
      var pais = <HTMLSelectElement>document.getElementById('pais_id');
      idPais = parseInt(pais.value);
    }
    this._spinnerService.show();
    this._regionesService.obtenerPorPais(idPais).subscribe(
      (res: Region[])=>{
        this.regiones = res;
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  cargarProvincias(idRegion: number = 0){
    if(idRegion == 0){
      var region = <HTMLSelectElement>document.getElementById('region_id');
      idRegion = parseInt(region.value);
    }
    this._spinnerService.show();
    this._provinciasService.obtenerPorRegion(idRegion).subscribe(
      (res: Provincia[])=>{
        this.provincias = res;
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  cargarComunas(idProvincia: number = 0){
    if(idProvincia == 0){    
      var provincia = <HTMLSelectElement>document.getElementById('provincia_id');
      idProvincia = parseInt(provincia.value);
    }
    this._spinnerService.show();
    this._comunasService.obtenerPorProvincia(idProvincia).subscribe(
      (res: Comuna[])=>{
        this.comunas = res;
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  grabar(){
    if(confirm("¿Desea grabar el registro?")){
      this._spinnerService.show();
      if(this.id !== 0){
        this.actualizar();
      }else{
        this.insertar();
      }
    }
  }


  private insertar(){ 
    this._ciudadesService.insert(this.formCiudad.value).subscribe(
      (res: string[])=>{
        this.handlerSuccess(res);

      },(error)=>{
        this.handlerError(error);
      }
    )
  }


  private actualizar(){
    this._ciudadesService.update(this.id, this.formCiudad.value).subscribe(
      (res: string[])=>{
        this.handlerSuccess(res);        

      },(error)=>{
        this.handlerError(error);
      }
    )
  }


  eliminar(){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._ciudadesService.delete(this.id).subscribe(
        (res: string[])=>{
          this.handlerSuccess(res);
  
        },(error)=>{
          this.handlerError(error);
        }
      )
    }
  }

  private handlerError(error){
    console.log(error);
    var msg = error.error != undefined ? error.errores.message : error.message;
    this._mensajesService.mostrarMensaje(msg, 'danger');
    this._spinnerService.hide();
  }

  private handlerSuccess(res: string[]){
    this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
    this.router.navigate(['/admin/ciudades']);
    this._spinnerService.hide();
  }
}