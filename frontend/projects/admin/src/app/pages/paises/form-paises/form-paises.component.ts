import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Pais } from 'src/app/class/pais';
import { PaisesInterface } from 'src/app/interfaces/PaisesInterface';
import { PaisesService } from 'src/app/service/paises.service';
import { ActivatedRoute, ɵangular_packages_router_router_o, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-form-paises',
  templateUrl: './form-paises.component.html',
  styleUrls: ['./form-paises.component.css']
})
export class FormPaisesComponent implements OnInit {
  public pais: Pais = new Pais();
  public id: number = 0;
  public formPais: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl() 
  });

  constructor(
    private _paisesService: PaisesService,
    private _messagesService: MessagesService,    
    private _spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,    
    private fb: FormBuilder,
    private router: Router
  ) { 
    this._messagesService.ocultarMensaje();
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != undefined && id != '0'){
      this.id = parseInt(id);
      this.buscar();
    }else{
      this.inicializarForm();
    }
  }

  ngOnInit() {
  }

  private inicializarForm(){
    this.formPais = this.fb.group({
      id:[this.pais.id],
      nombre:[this.pais.nombre,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      created_at:[this.pais.created_at],
      updaated_at:[this.pais.updated_at],
      deleted_at:[this.pais.deleted_at],
    });
  }

  private buscar(){
    this._spinnerService.show();
    this._paisesService.find(this.id).subscribe(
      (res: Pais)=>{        
        this.id = res['id'];
        console.log(this.id);
        this.pais = res;
        this.inicializarForm();        
        var encontrado = (this.id != 0)
        var divInfo = <HTMLDivElement>document.getElementById('action-title');
        divInfo.innerText = encontrado ? "Editando" : "Nuevo";
        this._spinnerService.hide();
        
      },(error)=>{
        console.log(error);
        this._messagesService.mostrarMensaje(error.message, 'danger');
        this._spinnerService.hide();
      });
  }
  
  grabar(){
    this._spinnerService.show();
    if(confirm("¿Desea grabar el registro?")){
      if(this.id != undefined && this.id != 0){
        this.actualizar();
      }else{
        this.insertar();
      }
    }
  }


  private insertar(){
    this._paisesService.insert(this.formPais.value).subscribe(
      (res: string[])=>{
        this._messagesService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
        this.router.navigate(['/admin/paises']);
        this._spinnerService.hide();
      },(error)=>{
        console.log(error);
        this._messagesService.mostrarMensaje(error.message, 'danger');
        this._spinnerService.hide();
      });
  }

  private actualizar(){
    this._paisesService.update(this.id, this.formPais.value).subscribe(
      (res: string[])=>{
        this._messagesService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
        this.router.navigate(['/admin/paises']);
        this._spinnerService.hide();

      },(error)=>{
        console.log(error);
        this._messagesService.mostrarMensaje(error.message, 'danger');
        this._spinnerService.hide();
      });
  }

  eliminar(){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._paisesService.delete(this.id).subscribe(
        (res: string[])=>{
          this._messagesService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
          this.router.navigate(['/admin/paises']);
          this._spinnerService.hide();

        },(error)=>{
          console.log(error);
          this._messagesService.mostrarMensaje(error.message, 'danger');
          this._spinnerService.hide();
        });
      }
  }
}
