import { Component, OnInit } from '@angular/core';
import { ComunasService } from 'src/app/service/comunas.service';
import { MessagesService } from 'src/app/service/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comuna } from 'src/app/class/comuna';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/service/spinner.service';
import { PaisesInterface } from 'src/app/interfaces/PaisesInterface';
import { Region } from 'src/app/class/region';
import { Provincia } from 'src/app/class/provincia';
import { PaisesService } from 'src/app/service/paises.service';
import { RegionesService } from 'src/app/service/regiones.service';
import { ProvinciasService } from 'src/app/service/provincias.service';
import { Pais } from 'src/app/class/pais';

@Component({
  selector: 'app-form-comunas',
  templateUrl: './form-comunas.component.html',
  styleUrls: ['./form-comunas.component.css']
})
export class FormComunasComponent implements OnInit {
  public comuna: Comuna = new Comuna();
  private id: number = 0;
  public formComuna: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    provincia_id: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),
    pais_id: new FormControl(),
    region_id: new FormControl(),
  });
  public paises: Pais[];
  public regiones: Region[];
  public provincias: Provincia[];


  constructor(
    private _paisesService: PaisesService,
    private _regionesService: RegionesService,
    private _provinciasService: ProvinciasService,
    private _comunasService: ComunasService,
    private _mensajesService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _spinnerService: SpinnerService
    ) {       
      this._mensajesService.ocultarMensaje();
      var strId = this.activatedRoute.snapshot.paramMap.get('id');
      if(strId !== "" && strId !== "0" && strId !== undefined){
        this.id = parseInt(strId);
        this.buscar();
      }else{
        this.inicializarFormulario();
      }
      this.obtenerPaises();

    }

  ngOnInit() {
  }

  private inicializarFormulario(){
    this.formComuna = this.fb.group({
      id: [this.comuna.id, [Validators.min(1)]],
      nombre: [this.comuna.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      provincia_id: [this.comuna.provincia_id, [Validators.required, Validators.min(1)]],
      created_at: [this.comuna.created_at],
      updated_at: [this.comuna.updated_at],
      deleted_at: [this.comuna.deleted_at],
      pais_id: this.comuna.pais_id,
      region_id: this.comuna.region_id
    });
  }

  private buscar(){
    this._spinnerService.show();  //Muestra el circulo de cargando...
    this._comunasService.find(this.id).subscribe(
      (res: Comuna)=>{
        this.comuna = res;
        this.obtenerProvincias(this.comuna.region_id);
        this.obtenerRegiones(this.comuna.pais_id);
        this.inicializarFormulario();
        var info = <HTMLDivElement>document.getElementById('action-title');
        info.innerText = 'Editando...';
        this._spinnerService.hide();

      },(error)=>{
        console.log(error);
        this._mensajesService.mostrarMensaje(error.message, 'danger');
        this._spinnerService.hide();
      })
  }

  private obtenerPaises(){
    this._spinnerService.show();
    this._paisesService.getAll().subscribe(
      (res: PaisesInterface[])=>{
        var arrOptions: Pais[];
        arrOptions = res;
        var optDefault = new Pais();
        optDefault.id = null,
        optDefault.nombre = '-- seleccione --';
        arrOptions.push(optDefault);
        
        this.paises = arrOptions.sort((x, y) => x.id - y.id);
        this._spinnerService.hide();
        
      },(error) =>{
        var pais = new Pais();
        pais.id = null,
        pais.nombre = error.message;
        this.paises.push(pais);
        this._spinnerService.hide();

      }
    )
  }

  obtenerRegiones(idPais: number = 0){   
    this._spinnerService.show();    
    if(idPais == 0){
      var pais = <HTMLSelectElement>document.getElementById('pais');
      idPais = parseInt(pais.value);
    }

    this._regionesService.obtenerPorPais(idPais).subscribe(
      (res: Region[])=>{
        var arrOptions: Region[];
        arrOptions = res;
        var optDefault = new Region();
        optDefault.id = null,
        optDefault.nombre = '-- seleccione --';
        arrOptions.push(optDefault);

        this.regiones = arrOptions.sort((x, y) => x.id - y.id);
        this._spinnerService.hide();
        
      },(error) =>{
        var pais = new Pais();
        pais.id = null,
        pais.nombre = error.message;
        this.regiones.push(pais);
        this._spinnerService.hide();
      }
    )
  }

  
  obtenerProvincias(idRegion: number = 0){
    this._spinnerService.show();
    if(idRegion == 0){
      var region = <HTMLSelectElement>document.getElementById('region');
      idRegion = parseInt(region.value);
    }

    this._provinciasService.obtenerPorRegion(idRegion).subscribe(
      (res: Region[])=>{
        var arrOptions: Provincia[];
        arrOptions = res;
        var optDefault = new Provincia();
        optDefault.id = null,
        optDefault.nombre = '-- seleccione --';
        arrOptions.push(optDefault);

        this.provincias = arrOptions.sort((x, y) => x.id - y.id);
        this._spinnerService.hide();
        
      },(error) =>{
        var pais = new Pais();
        pais.id = null,
        pais.nombre = error.message;
        this.provincias.push(pais);
        this._spinnerService.hide();
      }
    )
  }



  grabar(){   
    if(confirm("¿Desea grabar el registro?")){
      this._spinnerService.show();
      if(this.id === 0){
        this.insertar();
      }else{
        this.actualizar();
      }
    }    
  }

  private insertar(){
    this._comunasService.insert(this.formComuna.value).subscribe(
      (res: string[])=>{
        this.successHandler(res);
        this._spinnerService.hide();

        },(error)=>{
          this.errorHandler(error);
          this._spinnerService.hide();

      })
  }

  private actualizar(){
    this._comunasService.update(this.id, this.formComuna.value).subscribe(
      (res: string[])=>{
        this.successHandler(res);
        this._spinnerService.hide();

        },(error)=>{
          this.errorHandler(error);
          this._spinnerService.hide();
      })
  }

  eliminar(){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._comunasService.delete(this.id).subscribe(
        (res: string[])=>{
          this.successHandler(res);
          this._spinnerService.hide();

        },(error)=>{
          this.errorHandler(error);
          this._spinnerService.hide();
        });
    }
  }

  private errorHandler(error){
    console.log(error);
    var msg = error.message != undefined ? error.message : error.errores.message;
    this._mensajesService.mostrarMensaje(msg, 'danger');
  }

  private successHandler(res: string[]){
    this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
    this.router.navigate(['admin/comunas']);
  }

}
