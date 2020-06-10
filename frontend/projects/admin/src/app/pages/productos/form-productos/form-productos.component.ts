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
import { ImagenProducto } from '../../../../../../../src/app/class/imagen-producto';

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

    file: new FormControl([]),
    ruta_imagen: new FormControl([]),
    imagenes: new FormControl([]),
    
  });
  public marcas: Marca[];
  public categorias: Categoria[];
  public imagesBlob: any[] = Array();
  public deletedImages: number[] = [];

  constructor(
    private _productosService: ProductoService,
    private _marcasService: MarcasService,
    private _categoriasService: CategoriasService,
    private _spinnerService: SpinnerService,
    private _mensajeService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.cargarMarcas();
    this.cargarCategorias();
    this._mensajeService.ocultarMensaje();

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== undefined && id !== '0'){
      this.id = parseInt(id);
      this.buscar();
    }else{
      this.id = 0;
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
      visible: [this.producto.visible === undefined ? false : this.producto.visible, [Validators.required]],
      color: [this.producto.color === undefined ? '' : this.producto.color , [Validators.required, Validators.minLength(0), Validators.maxLength(20)]],
      nuevo: [this.producto.nuevo === undefined ? true : this.producto.nuevo, [Validators.required]],
      oferta: [this.producto.oferta === undefined ? false : this.producto.oferta, [Validators.required]],
      porcentaje_descuento: [this.producto.porcentaje_descuento, [Validators.required, Validators.min(0), Validators.max(100)]],
      created_at: [this.producto.created_at],
      updated_at: [this.producto.updated_at],
      deleted_at: [this.producto.deleted_at],
      file: [this.producto.file],
      ruta_imagen: [this.producto.file],
      imagenes: [this.producto.imagenes],
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

  private async insertar(){
    if(this.producto.imagenes !== undefined){
      let images = this.producto.imagenes.map(f => {if(f.constructor.name === 'ImagenProducto'){return f}}).filter( i => i !== undefined);
      await this.createListFile(images);
    }
    //let deletedImages: string[] =  this.producto.imagenes.map(f => {if(f.constructor.name === 'Object' && f.deleted_at !== null){return f.id.toString()}}).filter( i => i !== undefined);

    const formData = new FormData();
    for (const field in this.form.controls){
      if(field === 'file'){        
        if(this.form.get(field).value !== null){
          this.form.get(field).value.map( f => formData.append('file[]', f, f.name));
        }
      }else if(field === 'imagenes'){
          if(this.producto.imagenes !== undefined){
            this.producto.imagenes.map( f => formData.append('imagenes[]',JSON.stringify(f)));
          }
      }else{
        formData.append(field, this.form.get(field).value);
      }
    };

    formData.append('_method', 'POST');

    this._productosService.insert(formData).subscribe(
        (res: string[])=>{
          this.handlerSuccess(res);

        },(error)=>{
          this.handlerError(error);
        }
      )
    }


  private async actualizar(){
    let images = this.producto.imagenes.map(f => {if(f.constructor.name === 'ImagenProducto'){return f}}).filter( i => i !== undefined);
    let deletedImages: string[] =  this.producto.imagenes.map(f => {if(f.constructor.name === 'Object' && f.deleted_at !== null){return f.id.toString()}}).filter( i => i !== undefined);

    await this.createListFile(images);
    const formData = new FormData();
    for (const field in this.form.controls){
      if(field === 'file'){        
        if(this.form.get(field).value !== null){
          this.form.get(field).value.map( f => formData.append('file[]', f, f.name));
        }
      }else if(field === 'imagenes'){
          this.producto.imagenes.map( f => formData.append('imagenes[]',JSON.stringify(f)));
      }else{
        formData.append(field, this.form.get(field).value);
      }
    };

    formData.append('_method', 'PUT');

    if(deletedImages.length > 0){
      deletedImages.map( i => formData.append('deletedFiles[]', i));
    }    
    
    formData.append('_method', 'PUT');

    this._productosService.update(this.id, formData).subscribe(
      (res: any[])=>{
        this.handlerSuccess(res);
      },(error)=>{
        this.handlerError(error);
      }
    )
  }


  private async createListFile(origen)
  {
    var file = <HTMLInputElement>document.getElementById('input-files');
    let list = new DataTransfer();
    await origen.map( f => list.items.add(new File([f.data],f.nombre_archivo,{'type': 'image/png'})));
    file.files = list.files;
    console.log(file);
    return file;
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
    this._mensajeService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
    this._spinnerService.hide();
    if(res['tipo-mensaje'] === 'success'){
      this.router.navigate(['/admin/productos']);
    }
  }


  private handlerError(error: any){
    console.log(error);
    let msg = error.error !== undefined ? error.error.message : error.message;
    this._mensajeService.mostrarMensaje(msg, 'danger');
    this._spinnerService.hide();
  }


  // --------------------------------   MANEJO DE IMÁGENES -------------------------------- 

  //Convierte la imágen slececcionada desde el control file, en un objeto ImagenProducto, para poder ser 
  //agregada al array de imagenes this.producto.imagenes, ya que este array es el que contiene las imágenes
  //a subir al servidor (Backend)
  private createImage(img)
  {
    if(img === undefined )return img;
    var imgProd = new ImagenProducto();
    imgProd.id = img.lastModified;
    imgProd.producto_id = this.producto.id;
    imgProd.nombre_archivo = img.name;
    imgProd.default = false;
    return imgProd;
  }


  //Agrega las imágenes cargadas a través del control file, al array imagesBlob el cual contiene las 
  //referencia a las imágenes seleccionadas en el control file pero en formato Blob,
  //El array imagesBlob será iterado en el html para mostrrar los controles img con las imágenes
  private fileToBlob(f){
    var reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = (_event) => { 
      this.imagesBlob =this.imagesBlob.concat( {id: f.lastModified, data: reader.result}); 
    }
    
  }


  //Obtiene las imágenes seleccionadas desde el control File y luego las carga en el array this.producto.imagenes, para ser subidas
  //al servidor al momento de grabar el registro
  seleccionarArchivo(e){
    let files: File[] = Array.from(e.target.files);
    if(this.producto.imagenes !== undefined){
      var archivos = files.map( f => {if(!this.producto.imagenes.map(img => img.nombre_archivo).includes(f.name)){return this.createImage(f) }}).filter( f => f !== undefined );
      //this.producto.imagenes  = this.producto.imagenes.concat(archivos);
    }else{
      this.producto.imagenes = [];
      var archivos = files.map( f => this.createImage(f));
    }
    this.producto.imagenes  = this.producto.imagenes.concat(archivos);
    Array.from(e.target.files).map(f => this.fileToBlob(f)); //LLama a la función fileToBlob para preparar y cargar el array que contendrá las imágenes seleccionadas por el usuario a travéd del control file, las que se encuentran en memoria a diferencia de las imágenes que se encuentran en el array this.producto.imagenes las que se encuentran en el servidor (Backend)
  }


  public eliminarImagen(idProducto, idImagen){    
    this.producto.imagenes.map(i => i.id === idImagen ? i.deleted_at = new Date() : null);
    let div = <HTMLDivElement>document.getElementById(`div-img-${idProducto} - ${idImagen}`);
    div.style.display = 'none';
  }


  public quitarImagen(id){
    let div = <HTMLDivElement>document.getElementById(`div-img-${id}`);
    div.remove();
    this.imagesBlob = this.imagesBlob.filter( i => i.id !== id);
  }

  
  public configurarPredeterminada(id: number){    
    let chk = document.getElementsByClassName('chk-predeterminada');
    for(let key = 0;key < chk.length; key++){              
      var checbox = <HTMLInputElement>chk[key];
      checbox.checked = false;      
    }


    var checbox = <HTMLInputElement>document.getElementById('predeterminada' + id);
    checbox.checked = true; 

    this.producto.imagenes.map(i => i.default = i.id == id);
  }

  public showImageDialog(){
    let inputFile = <HTMLInputElement>document.getElementById('input-files');
    inputFile.click();
  }

  handlerPrecio(){
    let inputPrecio = <HTMLInputElement>document.getElementById('precio');    
    let inputPrecioAnterior = <HTMLInputElement>document.getElementById('precio_anterior');    
    let porcentaje = <HTMLInputElement>document.getElementById('porcentaje_descuento');
    let precioAnt = parseInt(inputPrecioAnterior.value);
    let porcent = parseInt(inputPrecioAnterior.value);
    if(precioAnt > 0){
      porcentaje.value = (Math.round(precioAnt * 100 / parseInt(inputPrecio.value)) - 100).toString();
    }
  }

  handlerPorcentaje(){
    let inputPrecio = <HTMLInputElement>document.getElementById('precio');    
    let inputPrecioAnterior = <HTMLInputElement>document.getElementById('precio_anterior');    
    let porcentaje = <HTMLInputElement>document.getElementById('porcentaje_descuento');
    inputPrecio.value =  Math.round(parseInt(inputPrecioAnterior.value) - (parseInt(inputPrecioAnterior.value) * (parseInt(porcentaje.value) / 100))).toString();
  }
  
  handlerPrecioAnterior(){
    let inputPrecio = <HTMLInputElement>document.getElementById('precio');
    let inputPrecioAnterior = <HTMLInputElement>document.getElementById('precio_anterior');
    let inputPorcentaje = <HTMLInputElement>document.getElementById('porcentaje_descuento');
    inputPorcentaje.value = Math.round(100 - (parseInt(inputPrecio.value) * 100 / parseInt(inputPrecioAnterior.value))).toString();
  }
}