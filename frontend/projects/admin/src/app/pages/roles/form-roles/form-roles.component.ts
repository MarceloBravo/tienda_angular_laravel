import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/service/roles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/class/rol';
import { HttpParams } from '@angular/common/http';
import { MessagesService } from 'src/app/service/messages.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SpinnerService } from 'src/app/service/spinner.service';
import { MessagesComponent } from 'src/app/shared/messages/messages.component';

@Component({
  selector: 'app-form-roles',
  templateUrl: './form-roles.component.html',
  styleUrls: ['./form-roles.component.css']
})
export class FormRolesComponent implements OnInit {
  private id: number = null;
  private rol: Rol = new Rol();
  public formRol: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    descripcion: new FormControl(),
    default: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl()
  })

  constructor(
    private _rolesService: RolesService,
    private activatedRoute: ActivatedRoute,
    private _mensajesService: MessagesService,
    private _spinnerService: SpinnerService,
    private fb: FormBuilder,
    private router: Router
  ) {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != "0" && id != null){
      this.id = parseInt(id);           
      this.buscar();        
    }else{
      this.inicializarForm();
    }
    this._mensajesService.ocultarMensaje();
   }

  ngOnInit() {
  }

  private inicializarForm(){
    this.formRol = this.fb.group({
      id: [this.rol.id],
      nombre:[this.rol.nombre,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion:[this.rol.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      default: [this.rol.default == null ? false : this.rol.default,[Validators.required]],
      created_at: [this.rol.created_at],
      updated_at: [this.rol.updated_at],
      deleted_at: [this.rol.deleted_at]
    })
  }

  private buscar(){
    this._spinnerService.show();
    this._rolesService.find(this.id).subscribe(
      (res: Rol)=>{
        var divNuevo = <HTMLDivElement>document.getElementById('action-title');
        divNuevo.innerText = (res.id != null) ? "Editando" : "Nuevo";
        this.rol = res;
        this.inicializarForm();
        this._spinnerService.hide();

    },(error)=>{
      console.log(error);
      this._mensajesService.mostrarMensaje(error.message, 'danger');
      this._spinnerService.hide();
    });
  }

  grabar(){
    if(confirm("¿Desea grabar el registro?"))
    {
      console.log(this.id);
      this._spinnerService.show();
      if(this.id != undefined && this.id != null){
        this.actulizar();
      }else{
        this.insertar();
      }
    }
  }

  private insertar(){
    this._rolesService.insert(this.formRol.value).subscribe(
      (res: string[])=>{
        this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
        if(res['tipo-mensaje'] == 'success')this.router.navigate(['/roles']);
        this._spinnerService.hide();
        this.router.navigate(['/admin/roles']);
      },(error)=>{
        console.log(error);
        this._mensajesService.mostrarMensaje(error.message, 'danger');
        this._spinnerService.hide();
      });
  }

  private actulizar(){
    this._rolesService.update(this.id, this.formRol.value).subscribe(
      (res: string[])=>{
        console.log(res);
        
        this._mensajesService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
        if(res['tipo-mensaje'] == 'success')this.router.navigate(['/roles']);
        this._spinnerService.hide();
        this.router.navigate(['/admin/roles']);
      },(error)=>{
        console.log(error);
        this._mensajesService.mostrarMensaje(error.message,'danger');
        this._spinnerService.hide();
      });
  }

  eliminar(){
    if(confirm("¿'Desea eliminar el registro?")){
      this._spinnerService.show();
      this._rolesService.delete(this.id).subscribe(
        (res: string[])=>{
          this._mensajesService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
          if(res['tipo-mensaje'] == 'success')this.router.navigate(['/roles']);
          this._spinnerService.hide();
          this.router.navigate(['/admin/roles']);
        },(error)=>{
          console.log(error);
          this._mensajesService.mostrarMensaje(error.message,'danger');
          this._spinnerService.hide();
        });
    }
  }
}
