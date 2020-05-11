import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/service/marcas.service';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Marca } from 'src/app/class/marca';
import { FormBuilder, Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-marcas',
  templateUrl: './form-marcas.component.html',
  styleUrls: ['./form-marcas.component.css']
})
export class FormMarcasComponent implements OnInit {
  public id: number;
  public marcas: Marca =  new Marca();
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl()
  });

  constructor(
    private _marcasService: MarcasService,
    private _mensajesService: MessagesService,
    private _spinnerService: SpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this._mensajesService.ocultarMensaje();
    let id = activatedRoute.snapshot.paramMap.get('id');
    if(id !== undefined && id !== ''){
      this.id = parseInt(id);      
      this.buscar();

    }else{
      this.crearForm();
    }
    console.log(this.id)
  }

  ngOnInit() {
  }

  private crearForm(){
    this.form = this.fb.group({
      id: [this.marcas.id, [Validators.min(1)]],
      nombre: [this.marcas.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      created_at: [this.marcas.created_at],
      updated_at: [this.marcas.updated_at],
      deleted_at: [this.marcas.deleted_at]
    });
  }

  private buscar(){
    this._spinnerService.show();
    this._marcasService.find(this.id).subscribe(
      (res: Marca)=>{
        this.marcas = res;
        this.crearForm();
        this._spinnerService.hide();
        if(this.id > 0){
          let info = <HTMLDivElement>document.getElementById('action-title');
          info.innerText = 'Editando...';
        }

      },(error)=>{
        this.handlerError(error);
      }
    )
    
  }

  grabar(){
    if(window.confirm("¿Desea grabar el registro?")){
      this._spinnerService.show();
      if(this.id !== undefined && this.id > 0){
        this.actualizar();
      }else{
        this.insertar();
      }
    }
  }

  private insertar(){
    this._marcasService.insert(this.form.value).subscribe(
      (res: string[])=>{
        this.handlerSuccess(res);

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  private actualizar(){
    this._marcasService.update(this.id, this.form.value).subscribe(
      (res: string[])=>{
        this.handlerSuccess(res);

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  eliminar(){
    if(window.confirm("¿Desea eliminar el registro?")){
      this._marcasService.delete(this.id).subscribe(
        (res: string[])=>{
          this.handlerSuccess(res);
  
        },(error)=>{
          this.handlerError(error);
        }
      )
    }
  }

  private handlerSuccess(res: string[]){
    this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
    this._spinnerService.hide();
    this.route.navigate(['admin/marcas']);
  }

  private handlerError(error: any){
    console.log(error);
    let msg = error.errors ? error.errors.messages : error.mesage;
    this._mensajesService.mostrarMensaje(msg, 'danger');
    this._spinnerService.hide();
  }

}
