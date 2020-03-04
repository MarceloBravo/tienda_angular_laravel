import { Component, OnInit } from '@angular/core';
import { PantallasService } from '../../../services/pantallas.service';
import { MessagesService } from 'src/app/service/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pantalla } from '../../../clases/pantalla';
import { SpinnerService } from 'src/app/service/spinner.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-pantallas',
  templateUrl: './form-pantallas.component.html',
  styleUrls: ['./form-pantallas.component.css']
})
export class FormPantallasComponent implements OnInit {
  private id: number = 0;
  public pantalla: Pantalla = new Pantalla();

 formPantalla: FormGroup = new FormGroup({
   id: new FormControl(),
   nombre: new FormControl(),
   tabla: new FormControl(),
   permite_crear: new FormControl(),
   permite_editar: new FormControl(),
   permite_eliminar: new FormControl()
 });

  constructor(
    private _pantallasService: PantallasService,
    private _messagesService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snipperService: SpinnerService,
    private fb: FormBuilder
  ) {
    this._messagesService.ocultarMensaje();
    this.id =  parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.id != undefined && this.id != 0){
      this.buscar();
    }else{
      this.inicializaFormulario();
    }
    
   }

  ngOnInit() {
  }

  

  private inicializaFormulario(){
    this.formPantalla = this.fb.group({      
      nombre: [this.pantalla.nombre,[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      tabla: [this.pantalla.tabla, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      permite_crear: [this.pantalla.permite_crear],
      permite_editar: [this.pantalla.permite_editar],
      permite_eliminar: [this.pantalla.permite_eliminar],
      created_at: [this.pantalla.created_at],
      updated_at: [this.pantalla.updated_at],
      deleted_at: [this.pantalla.deleted_at]
    });
  }

  private buscar(){
    this._snipperService.show();  //Muestra la imágen modal de carga de datos
    this._pantallasService.find(this.id).subscribe(
      (res: Pantalla)=>{
        this.pantalla = res;
        var divAction = <HTMLDivElement>document.getElementById('action-title');        
        divAction.innerHTML = (res['id'] != 0 && res['id'] != null) ? "Editando..." : "Nuevo";
        this._snipperService.hide();  //Oculta la imágen modal de carga de datos
        this.inicializaFormulario();
    },(error)=>{
      console.log(error);
      this._messagesService.mostrarMensaje(error.message, 'danger');
      this._snipperService.hide();  //Oculta la imágen modal de carga de datos
    });
  }

  grabar(){
    if(confirm("¿Desea grabar el registro?")){
      if(this.id != 0 && this.id != null){
        this.actualizar();
      }else{
        this.insertar();
      }
    }
  }

  private insertar(){    
    this.pantalla = this.formPantalla.value;  //Traspasa los datos desde el FormGroup al objeto this.pantalla
    this._snipperService.show();  //Muestra la imágen modal de carga de datos
    this._pantallasService.insert(this.pantalla).subscribe(
      (res: any[])=>{
        this._messagesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
        this.id = res['id'];
        this.router.navigate(['/admin/pantallas']);
        this._snipperService.hide();  //Oculta la imágen modal de carga de datos
    },(error)=>{
      console.log(error);
      this._messagesService.mostrarMensaje(error.message, 'danger');
      this._snipperService.hide();  //Oculta la imágen modal de carga de datos
    });
  }

  private actualizar(){
    this.pantalla = this.formPantalla.value;  //Traspasa los datos desde el FormGroup al objeto this.pantalla 
    this._snipperService.show();  //Muestra la imágen modal de carga de datos
    this._pantallasService.update(this.id, this.pantalla).subscribe(
      (res: string[])=>{
        this._messagesService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
        this.router.navigate(['/admin/pantallas']);        
        this._snipperService.hide();  //Oculta la imágen modal de carga de datos
      },(error)=>{
        console.log(error);
        this._messagesService.mostrarMensaje(error.message, 'danger');
        this._snipperService.hide();  //Oculta la imágen modal de carga de datos
      });
  }

  eliminar(){
    this._snipperService.show();  //Oculta la imágen modal de carga de datos
    if(confirm("¿Desea eliminar el registro?")){
      this._pantallasService.delete(this.id).subscribe(
        (res: string[])=>{
          this._messagesService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
          this.router.navigate(['/admin/pantallas']);
          this._snipperService.hide();  //Oculta la imágen modal de carga de datos
        },(error)=>{
          console.log(error);
          this._messagesService.mostrarMensaje(error.message, 'danger');
          this._snipperService.hide();  //Oculta la imágen modal de carga de datos
        });
      }
  }

}
