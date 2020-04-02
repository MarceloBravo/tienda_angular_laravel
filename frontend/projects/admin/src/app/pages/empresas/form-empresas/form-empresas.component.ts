import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/service/empresa.service';
import { CiudadesService } from 'src/app/service/ciudades.service';
import { ComunasService } from 'src/app/service/comunas.service';
import { ProvinciasService } from 'src/app/service/provincias.service';
import { RegionesService } from 'src/app/service/regiones.service';
import { PaisesService } from 'src/app/service/paises.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/class/empresa';
import { Pais } from 'src/app/class/pais';
import { Region } from 'src/app/class/region';
import { Provincia } from 'src/app/class/provincia';
import { Comuna } from 'src/app/class/comuna';
import { Ciudad } from 'src/app/class/ciudad';
import { CustomValidators } from '../../../../../../../src/app/customValidators/custom-validators';

@Component({
  selector: 'app-form-empresas',
  templateUrl: './form-empresas.component.html',
  styleUrls: ['./form-empresas.component.css']
})
export class FormEmpresasComponent implements OnInit {
  private id: number = 0;
  public empresa: Empresa = new Empresa();
  public formEmpresa: FormGroup = new FormGroup({
    id: new FormControl(),
    rut: new FormControl(),
    nombre: new FormControl(),
    direccion: new FormControl(),
    ciudad_id: new FormControl(),
    fono: new FormControl(),
    email: new FormControl(),
    giro: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),
    ciudad: new FormControl(),

    comuna_id: new FormControl(),
    provincia_id: new FormControl(),
    region_id: new FormControl(),
    pais_id: new FormControl()
  });
  public paises: Pais[];
  public regiones: Region[];
  public provincias: Provincia[];
  public comunas: Comuna[];
  public ciudades: Ciudad[];

  constructor(
    private _empresasService: EmpresaService,
    private _ciudadesService: CiudadesService,
    private _comunasService: ComunasService,
    private _provinciasService: ProvinciasService,
    private _regionesService: RegionesService,
    private _paisesService: PaisesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _mensajesService: MessagesService,
    private _spinnerService: SpinnerService,
    private fb: FormBuilder
    //private _validaRutService: ValidaRutService
  ) { 
    this._mensajesService.ocultarMensaje();
    var id = this.activatedRoute.snapshot.paramMap.get('id');    
    if(id !== '0' && id !== undefined){
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
    this.formEmpresa = this.fb.group({
      id: [this.empresa.id, [Validators.min(0)]],
      //rut: [this.empresa.rut, [Validators.required, Validators.minLength(10), Validators.maxLength(13)], this._validaRutService.validaRut.bind(this._validaRutService)],
      rut: [this.empresa.rut, [Validators.required, Validators.minLength(10), Validators.maxLength(13), CustomValidators.validaRut]],
      nombre: [this.empresa.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      direccion: [this.empresa.direccion, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      ciudad_id: [this.empresa.ciudad_id, [Validators.required, Validators.min(0)]],
      fono: [this.empresa.fono, [Validators.required, Validators.minLength(9), Validators.maxLength(20)]],
      email: [this.empresa.email, [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(100)]],
      giro: [this.empresa.giro, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      created_at: [this.empresa.created_at],
      updated_at: [this.empresa.updated_at],
      deleted_at: [this.empresa.deleted_at],

      comuna_id: [this.empresa.comuna_id, [Validators.required, Validators.min(0)]],
      provincia_id: [this.empresa.provincia_id, [Validators.required, Validators.min(0)]],
      region_id: [this.empresa.region_id, [Validators.required, Validators.min(0)]],
      pais_id: [this.empresa.pais_id, [Validators.required, Validators.min(0)]]
    });
  }

  //get registerFormControl(){
  //  return this.formEmpresa.controls;
  //}


  //validarRut(input: FormControl){
  //  var res = this._validaRutService.validaRut(input.value);
  //  return res;
  //}

  private buscar(){
    this._spinnerService.show();
    this._empresasService.find(this.id).subscribe(
      (res: Empresa)=>{
        this.empresa = res;
        this.cargarRegiones(this.empresa.pais_id);
        this.cargarProvincias(this.empresa.region_id);
        this.cargarComunas(this.empresa.provincia_id);
        this.cargarCiudades(this.empresa.comuna_id);
        this.inicializarFormulario();
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

  cargarRegiones(idPais: number){
    if(idPais === undefined){
      var selectPais = <HTMLSelectElement>document.getElementById('pais_id');
      idPais = parseInt(selectPais.value);
    }
    this._spinnerService.show();
    this._regionesService.obtenerPorPais(idPais).subscribe(
      (res: Region[])=>{
        this.regiones = res;
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    );
  }

  cargarProvincias(idRegion: number){
    if(idRegion === undefined){
      var selectRegion = <HTMLSelectElement>document.getElementById('region_id');
      idRegion = parseInt(selectRegion.value);
    }
    this._spinnerService.show();
    this._provinciasService.obtenerPorRegion(idRegion).subscribe(
      (res: Provincia[])=>{
        this.provincias = res;
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    );
  }

  cargarComunas(idProvincia: number){
    if(idProvincia === undefined){
      var selectProvincia = <HTMLSelectElement>document.getElementById('provincia_id');
      idProvincia = parseInt(selectProvincia.value);
    }
    this._spinnerService.show();
    this._comunasService.obtenerPorProvincia(idProvincia).subscribe(
      (res: Comuna[])=>{
        this.comunas = res;
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    );
  }

  cargarCiudades(idComuna: number){
    if(idComuna === undefined){
      var selectComuna = <HTMLSelectElement>document.getElementById('comuna_id');
      idComuna = parseInt(selectComuna.value);
    }
    this._spinnerService.show();
    this._ciudadesService.obtenerPorComuna(idComuna).subscribe(
      (res: Ciudad[])=>{
        this.ciudades = res;
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    );
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
    this._empresasService.insert(this.formEmpresa.value).subscribe(
      (res: string[])=>{
        this.handlerMessages(res);

      },(error)=>{
        this.handlerError(error);
      }
    );
  }

  private actualizar(){
    this._empresasService.update(this.id, this.formEmpresa.value).subscribe(
      (res: string[])=>{
        this.handlerMessages(res);

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  eliminar(){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._empresasService.delete(this.id).subscribe(
        (res: string[])=>{
          this.handlerMessages(res);
  
        },(error)=>{
          this.handlerError(error);
        }
      );
    }
  }


  private handlerError(error){
    console.log(error);
    var msg = error.errores !== undefined ? error.errores.message : error.message;
    this._mensajesService.mostrarMensaje(msg, 'danger');
    this._spinnerService.hide();
  }
  
  private handlerMessages(res: string[]){
    this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
    this.router.navigate(['/admin/empresas']);
    this._spinnerService.hide();
  }

}
