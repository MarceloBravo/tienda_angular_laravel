import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { MessagesService } from 'src/app/service/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcasService } from 'src/app/service/marcas.service';
import { CategoriasService } from 'src/app/service/categorias.service';
import { Producto } from 'src/app/class/producto';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Marca } from 'src/app/class/marca';
import { Categoria } from 'src/app/class/categoria';

import { ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { UploadService } from  'src/app/service/upload.service';
import { UploadFilesService } from '../../../services/upload-files.service';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent implements OnInit {
  @ViewChild("fileUpload") fileUpload: ElementRef;files  = [];  
  public id: number;
  public producto: Producto = new Producto();
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    descripcion: new FormControl(),
    resumen: new FormControl(),
    slug: new FormControl(),
    categoria_id: new FormControl(),
    marca_id: new FormControl(),
    precio: new FormControl(),
    precio_anterior: new FormControl(),
    visible: new FormControl(),
    color: new FormControl(),
    nuevo: new FormControl(),
    oferta: new FormControl(),
    porcentaje_descuento: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),

    file: new FormControl()
  });
  public marcas: Marca[];
  public categorias: Categoria[];

  private archivo = {
    nombre: null, //Nombre dado por el usuario
    nombreArchivo:null, //Nombre real del archivo
    base64TextString: null,
    data: null
  };


  constructor(
    private _productosService: ProductoService,
    private _marcasService: MarcasService,
    private _categoriasService: CategoriasService,
    private _spinnerService: SpinnerService,
    private _mensajeService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private _uploadFilesService: UploadFilesService

  ) { 
    this.cargarMarcas();
    this.cargarCategorias();
    this._mensajeService.ocultarMensaje();

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== undefined && id !== ''){
      this.id = parseInt(id);
      this.buscar();
    }else{
      this.buildForm();
    }
  }

  ngOnInit() {
  }

  private buildForm(){
    this.form = this.fb.group({
      id: [this.producto.id, [Validators.min(0)]],
      nombre: [this.producto.nombre,[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: [this.producto.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      resumen: [this.producto.resumen, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      slug: [this.producto.slug, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      categoria_id: [this.producto.categoria_id, [Validators.required, Validators.min(1)]],
      marca_id: [this.producto.marca_id, [Validators.required, Validators.min(1)]],
      precio: [this.producto.precio, [Validators.required, Validators.min(1)]],
      precio_anterior: [this.producto.precio_anterior, [Validators.required, Validators.min(0)]],
      visible: [this.producto.visible, [Validators.required]],
      color: [this.producto.color, [Validators.required, Validators.minLength(0), Validators.maxLength(20)]],
      nuevo: [this.producto.nuevo, [Validators.required]],
      oferta: [this.producto.oferta, [Validators.required]],
      porcentaje_descuento: [this.producto.porcentaje_descuento, [Validators.required, Validators.min(0), Validators.max(100)]],
      created_at: [this.producto.created_at],
      updated_at: [this.producto.updated_at],
      deleted_at: [this.producto.deleted_at],
      file: [this.producto.file],
      _method: null
      
    })
  }

  private buscar(){
    this._spinnerService.show();
    this._productosService.find(this.id).subscribe(
      (res: Producto) => {
        this.producto = res;
        this.buildForm();
        if(res['id'] !== undefined){
          let info = <HTMLDivElement>document.getElementById('action-title');
          info.innerText = 'Editando...';
        }
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  private cargarMarcas(){
    this._spinnerService.show();
    this._marcasService.getAll().subscribe(
      (res: Marca[]) => {
        this.marcas = res;
        this._spinnerService.hide();
        
      },(error)=>{
        this.handlerError(error);
      }
    )

  }

  private cargarCategorias(){
    this._spinnerService.show();
    this._categoriasService.getAll().subscribe(
      (res: Categoria[]) => {
        this.categorias = res;
        this._spinnerService.hide();
        
      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  grabar(){
    if(window.confirm("¿Desea grabar el registro?"))
    {
      this._spinnerService.show();
      if(this.id !== null && this.id > 0){
        this.actualizar();
      }else{
        this.insertar();
      }
    }
  }

  private insertar(){
    this._productosService.insert(this.form.value).subscribe(
      (res: string[])=>{
        this.handlerSuccess(res);

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  private actualizar(){
    console.log(this.form.value);

    this._productosService.update(this.id, this.form.value).subscribe(
      (res: any[])=>{
        this.handlerSuccess(res);

      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  eliminar(){
    if(window.confirm("Desea eliminar el registro?")){
      this._productosService.delete(this.id).subscribe(
        (res: string[])=>{
          this.handlerSuccess(res);
  
        },(error)=>{
          this.handlerError(error);
        }
      )
    }
  }


  private handlerSuccess(res: string[]){
    console.log(res);
    this._mensajeService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
    this._spinnerService.hide();
    this.router.navigate(['/admin/productos']);
  }


  private handlerError(error: any){
    console.log(error);
    this._mensajeService.mostrarMensaje(error.message(), 'danger');
    this._spinnerService.hide();
  }

  seleccionarArchivo(e){
    let fileName = <HTMLInputElement>document.getElementById('file');
    fileName.value = e.target.value;
  }

/*
  seleccionarArchivo(event){
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;     
    this.archivo.data = file;

    if(file && files){
      var reader = new FileReader();
      reader.onload = this.handlerReaderOnLoad.bind(this);
      reader.readAsBinaryString(file);
      
    }

  }

  private handlerReaderOnLoad(readerEvent){
    var binaryString = readerEvent.target.result;
    this.archivo.base64TextString = btoa(binaryString);
  }

  uploadFile(){
    let nombre = <HTMLInputElement>document.getElementById('txt_fileName');
    this.archivo.nombre = nombre.value;
    
    let formData: FormData = new FormData();    
    formData.append('file', this.archivo.data);
    //console.log(formData);
    this._uploadFilesService.insert(formData).subscribe(
      (res)=>{
        //this._mensajeService.showModalMessage('Subida de archivos',res['mensaje']);
        console.log(res);
        //if(res['tipo-mensaje'] === 'success'){
        //alert(res['mensaje']);
        //}
      },(error)=>{
        console.log(error);
        alert(error.message);
      }
    )
  }

  
  /*
  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this.uploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }

  private uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);  
    });  
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
    for (let index = 0; index < fileUpload.files.length; index++)  
    {  
     const file = fileUpload.files[index];  
     this.files.push({ data: file, inProgress: false, progress: 0});  
    }  
      this.uploadFiles();  
    };  
    fileUpload.click();  
  }
  */
}
