import { Component, OnInit } from '@angular/core';
import { RegionesService } from 'src/app/service/regiones.service';
import { MessagesService } from 'src/app/service/messages.service';
import { Region } from 'src/app/class/region';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/service/spinner.service';
import { PaisesInterface } from 'src/app/interfaces/PaisesInterface';
import { PaisesService } from 'src/app/service/paises.service';

@Component({
  selector: 'app-form-regiones',
  templateUrl: './form-regiones.component.html',
  styleUrls: ['./form-regiones.component.css']
})
export class FormRegionesComponent implements OnInit {
  public region: Region = new Region(); 
  public id: number = 0;
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    pais_id: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl()
  });
  public paises: PaisesInterface[];

  constructor(
    private _regionesService: RegionesService,
    private _mensajesService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private _spinnerService: SpinnerService,
    private fb: FormBuilder,
    private _paisesService: PaisesService,
    private router: Router
  ) {
    this._mensajesService.ocultarMensaje();                    
    this.cargarPaises();
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != undefined && id != ''){
      this.id = parseInt(id);
      this.buscar();
    }else{
      this.iniciarForm();
    }    
  }

  ngOnInit() {
  }

  private iniciarForm(){
    this.form = this.fb.group({
      id: [this.region.id, [Validators.min(0)]],
      nombre: [this.region.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      pais_id:[ this.region.pais_id,[Validators.required, Validators.min(0)]],
      created_at:[ this.region.created_at],
      updated_at:[ this.region.updated_at],
      deleted_at:[ this.region.deleted_at],
    });
  }

  private buscar(){ 
    this._spinnerService.show();
    this._regionesService.find(this.id).subscribe(
      (res: Region)=>{        
        this.region = res;
        this.iniciarForm(); 
        if(res.id != undefined){
          var divInfo = <HTMLDivElement>document.getElementById('action-title');
          divInfo.innerText = 'Editando...';
        }
        this._spinnerService.hide();
        
      },(error)=>{
        console.log(error);
        var msg = (error.error != undefined ? error.error.message : error.message);
        this._mensajesService.mostrarMensaje(msg, 'danger');
        this._spinnerService.hide();

      });
  }


  grabar(){
    if(confirm("¿Desea grabar el registro?"))
    {
      this._spinnerService.show();
      if(this.id > 0){
        this.actualizar();
      }else{
        this.insertar();
      }
    }
  }

  private insertar(){
    this._regionesService.insert(this.form.value).subscribe(
      (res: string[])=>{
        this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
        this._spinnerService.hide();
        this.router.navigate(['/admin/regiones']);
      },(error)=>{
        console.log(error);
        var msg = (error.error != undefined ? error.error.message : error.message);
        this._mensajesService.mostrarMensaje(msg, 'danger');
        this._spinnerService.hide();
      });
  }

  private actualizar(){
    this._regionesService.update(this.id, this.form.value).subscribe(
      (res: string[])=>{
        this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
        this._spinnerService.hide();
        this.router.navigate(['/admin/regiones']);
      },(error)=>{
        console.log(error);
        var msg = (error.error != undefined ? error.error.message : error.message);
        this._mensajesService.mostrarMensaje(msg, 'danger');
        this._spinnerService.hide();
      });
  }

  eliminar(){
    if(confirm("¿Desea eliminar el registro?")){
      this._regionesService.delete(this.id).subscribe(
        (res: string[])=>{
          this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
          this._spinnerService.hide();
          this.router.navigate(['/admin/regiones']);

        },(error)=>{
          console.log(error);
          var msg = (error.error != undefined ? error.error.message : error.message);
          this._mensajesService.mostrarMensaje(msg, 'danger');
          this._spinnerService.hide();
        });
    }
  }
  
  private cargarPaises(){
    this._spinnerService.show();
    this._paisesService.getAll().subscribe(
      (res: PaisesInterface[])=>{
        this.paises = res;
        this._spinnerService.hide();

      },(error)=>{
        console.log(error);
        var msg = (error.error != undefined ? error.error.message : error.message);
        this._mensajesService.mostrarMensaje(msg, 'danger');
        this._spinnerService.hide();

      });
  }
}
