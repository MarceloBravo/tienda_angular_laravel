import { Component, OnInit } from '@angular/core';
import { ProvinciasService } from 'src/app/service/provincias.service';
import { MessagesService } from 'src/app/service/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/service/spinner.service';
import { Provincia } from 'src/app/class/provincia';
import { Region } from 'src/app/class/region';
import { RegionesService } from 'src/app/service/regiones.service';

@Component({
  selector: 'app-form-provincias',
  templateUrl: './form-provincias.component.html',
  styleUrls: ['./form-provincias.component.css']
})
export class FormProvinciasComponent implements OnInit {
  public regiones: Region[];
  public id: number = 0;
  private provincia: Provincia = new Provincia();
  public form: FormGroup =  new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    region_id: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl()
  }); 

  constructor(
    private _provinciasService: ProvinciasService,
    private _regionesService: RegionesService,
    private _mensajeService: MessagesService,
    private actveRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _spinnerSevice: SpinnerService,
    private router: Router
  ) { 
    this._mensajeService.ocultarMensaje();
    this.cargarRegiones();    
    var id = this.actveRoute.snapshot.paramMap.get('id');
    if(id !== undefined && id !== '0'){
      this.id = parseInt(id);
      this.buscar();
    }else{
      this.iniciarFormulario();
    }
  }

  ngOnInit() {
  }

  private buscar(){
    this._spinnerSevice.show();
    this._provinciasService.find(this.id).subscribe(
      (res: Provincia)=>{
        this.provincia = res;
        this.id = res['id'];
        this.iniciarFormulario();
        var divInfo = <HTMLDivElement>document.getElementById('action-title');
        divInfo.innerText = "Editando...";
        this._spinnerSevice.hide();

      },(error)=>{
        this.gestionErrores(error);

      });
  }


  //Inicializa el formulario y asigna las validaciones de cada campo para el formulario
  private iniciarFormulario(){
    this.form = this.fb.group({
      id:[ this.provincia.id, [Validators.min(1)]],
      nombre: [this.provincia.nombre,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      region_id: [ this.provincia.region_id,[Validators.required, Validators.min(1)]],
      created_at:[this.provincia.created_at],
      updated_at:[this.provincia.updated_at],
      deleted_at:[this.provincia.deleted_at],
    })
  }

  private cargarRegiones(){
    this._spinnerSevice.show();    
    this._regionesService.getAll().subscribe(
      (res: Region[])=>{
        this.regiones = res;
        this._spinnerSevice.hide();
        
      },(error)=>{
        this.gestionErrores(error);
      });
  }

  grabar(){
    if(confirm("¿Desea grabar el registro?")){
      if(this.id !== undefined){
        if(this.id > 0){
          this.actualizar();
        }else{
          this.insertar();
        }
      }
    }
  }

  private insertar(){
    this._spinnerSevice.show();
    this._provinciasService.insert(this.form.value).subscribe(
      (res: string[])=>{
        this._mensajeService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
        this._spinnerSevice.hide();
        this.router.navigate(['admin/provincias']);

      },(error)=>{
        this.gestionErrores(error);
      });
  }

  private actualizar(){
    this._spinnerSevice.show();
    this._provinciasService.update(this.id, this.form.value).subscribe(
      (res: string[])=>{
        this._mensajeService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
        this._spinnerSevice.hide();
        this.router.navigate(['admin/provincias']);

      },(error)=>{
        this.gestionErrores(error);
      });
  }

  eliminar(){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerSevice.show();
      this._provinciasService.delete(this.id).subscribe(
        (res: string[])=>{
          this._mensajeService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
          this._spinnerSevice.hide();
          this.router.navigate(['admin/provincias']);

        },(error)=>{
          this.gestionErrores(error);
        });
    }
  }
  
  private gestionErrores(error){
    console.log(error);
    var msg = error.error !== undefined ? error.error.danger : error.danger;
    this._mensajeService.mostrarMensaje(msg, 'danger');
    this._spinnerSevice.hide();
  }

}
