import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/service/categorias.service';
import { MessagesService } from 'src/app/service/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/class/categoria';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-form-categorias',
  templateUrl: './form-categorias.component.html',
  styleUrls: ['./form-categorias.component.css']
})
export class FormCategoriasComponent implements OnInit {
  public id: number = 0;
  public categoria: Categoria = new Categoria();
  public formCategoria: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl()
  });


  constructor(
    private _categoriasService: CategoriasService,
    private _mensajesServices: MessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,  
    private _spinnerService: SpinnerService
  ) {
    this._mensajesServices.ocultarMensaje();
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== '' && id !== '0'){
      this.id = parseInt(id);
      this.buscar();
    }else{
      this.inicializarFormulario();
    }
   }

  ngOnInit() {
  }

  private inicializarFormulario(){
    this.formCategoria = this.fb.group({
      id: [this.categoria.id, [Validators.min(0)]],
      nombre: [this.categoria.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      created_at: [this.categoria.created_at],
      updated_at: [this.categoria.updated_at],
      deleted_at: [this.categoria.deleted_at]
    });
  }


  private buscar(){
    this._spinnerService.show();
    this._categoriasService.find(this.id).subscribe(
      (res: Categoria)=>{
        this.categoria = res;
        this.inicializarFormulario();
        this._spinnerService.hide();
        var info = <HTMLDivElement>document.getElementById('action-title');
        info.innerText = 'Editando...';

      },(error)=>{
        this.handlerError(error);
      });
  }


  grabar(){
    this._mensajesServices.ocultarMensaje();
    if(window.confirm("¿Desea grabar el registro?")){
      this._spinnerService.show();
      if(this.id != 0){
        this.actualizar();
      }else{
        this.insertar();
      }
    }
  }

  private insertar(){
    this._categoriasService.insert(this.formCategoria.value).subscribe(
      (res: string[])=>{
        this.handlerSuccess(res);
        
      },(error)=>{
        this.handlerError(error);
      });
  }

  private actualizar(){
    this._categoriasService.update(this.id, this.formCategoria.value).subscribe(
      (res: string[])=>{
        this.handlerSuccess(res);
        
      },(error)=>{
        this.handlerError(error);
      });
  }

  eliminar(){
    this._mensajesServices.ocultarMensaje();
    if(window.confirm("¿Desea eliminar el registro?")){
      this._categoriasService.delete(this.id).subscribe(
        (res: string[])=>{
          this.handlerSuccess(res);
          
        },(error)=>{
          this.handlerError(error);
        });
    }
  }

  private handlerSuccess(res: string[]){
    this._mensajesServices.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
    this._spinnerService.hide();
    this.router.navigate(['/admin/categorias']);
  }

  private handlerError(error: any){
    console.log(error);
    var msg = error.errors ? error.errors.message : error.message;
    this._mensajesServices.mostrarMensaje(msg, 'danger');
    this._spinnerService.hide();
  }
}
