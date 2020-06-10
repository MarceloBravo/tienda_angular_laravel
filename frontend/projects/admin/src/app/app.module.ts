import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { AppRoutingModule } from './app-routing.module';
import { GridMenusComponent } from './pages/menus/grid-menus/grid-menus.component';
import { FormMenusComponent } from './pages/menus/form-menus/form-menus.component';
import { ModalMessagesComponent } from './shared/modal-messages/modal-messages.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './shared/messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/loading/loading.component';
import { GridPantallasComponent } from './pages/pantallas/grid-pantallas/grid-pantallas.component';
import { FormPantallasComponent } from './pages/pantallas/form-pantallas/form-pantallas.component';
import { GridRolesComponent } from './pages/roles/grid-roles/grid-roles.component';
import { FormRolesComponent } from './pages/roles/form-roles/form-roles.component';
import { GridPaisesComponent } from './pages/paises/grid-paises/grid-paises.component';
import { FormPaisesComponent } from './pages/paises/form-paises/form-paises.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GridRegionesComponent } from './pages/regiones/grid-regiones/grid-regiones.component';
import { FormRegionesComponent } from './pages/regiones/form-regiones/form-regiones.component';
import { GridProvinciasComponent } from './pages/provincias/grid-provincias/grid-provincias.component';
import { FormProvinciasComponent } from './pages/provincias/form-provincias/form-provincias.component';
import { GridComunasComponent } from './pages/comunas/grid-comunas/grid-comunas.component';
import { FormComunasComponent } from './pages/comunas/form-comunas/form-comunas.component';
import { GridCiudadesComponent } from './pages/ciudades/grid-ciudades/grid-ciudades.component';
import { FormCiudadesComponent } from './pages/ciudades/form-ciudades/form-ciudades.component';
import { GridEmpresasComponent } from './pages/empresas/grid-empresas/grid-empresas.component';
import { FormEmpresasComponent } from './pages/empresas/form-empresas/form-empresas.component';
import { GridCategoriasComponent } from './pages/categorias/grid-categorias/grid-categorias.component';
import { FormCategoriasComponent } from './pages/categorias/form-categorias/form-categorias.component';
import { GridPermisosComponent } from './pages/permisos/grid-permisos/grid-permisos.component';
import { GridMarcasComponent } from './pages/marcas/grid-marcas/grid-marcas.component';
import { FormMarcasComponent } from './pages/marcas/form-marcas/form-marcas.component';
import { GridProductosComponent } from './pages/productos/grid-productos/grid-productos.component';
import { FormProductosComponent } from './pages/productos/form-productos/form-productos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //Necesario para utiliza Tabs
import {FileInputAccessorModule} from "file-input-accessor";

import { UploadFilesService } from './services/upload-files.service';


import { MatToolbarModule,  
          MatIconModule,  
          MatCardModule,  
          MatButtonModule,  
          MatProgressBarModule } from '@angular/material';
import { GridUsuariosComponent } from './pages/usuarios/grid-usuarios/grid-usuarios.component';
import { FormUsuariosComponent } from './pages/usuarios/form-usuarios/form-usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    TopbarComponent,
    GridMenusComponent,
    FormMenusComponent,
    ModalMessagesComponent,
    MessagesComponent,
    LoadingComponent,
    GridPantallasComponent,
    FormPantallasComponent,
    GridRolesComponent,
    FormRolesComponent,
    GridPaisesComponent,
    FormPaisesComponent,
    LoginComponent,
    AdminHomeComponent,
    GridRegionesComponent,
    FormRegionesComponent,
    GridProvinciasComponent,
    FormProvinciasComponent,
    GridComunasComponent,
    FormComunasComponent,
    GridCiudadesComponent,
    FormCiudadesComponent,
    GridEmpresasComponent,
    FormEmpresasComponent,
    GridCategoriasComponent,
    FormCategoriasComponent,
    GridPermisosComponent,
    GridMarcasComponent,
    FormMarcasComponent,
    GridProductosComponent,
    FormProductosComponent,
    GridUsuariosComponent,
    FormUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Necesario para poder utilizar la etiqueta <router-outlet></router-outlet>
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    MatCardModule,  
    MatProgressBarModule,
    FileInputAccessorModule
  ],
  providers: [
    UploadFilesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
