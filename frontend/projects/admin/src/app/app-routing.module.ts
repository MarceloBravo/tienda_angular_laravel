import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GridMenusComponent } from './pages/menus/grid-menus/grid-menus.component';
import { FormMenusComponent } from './pages/menus/form-menus/form-menus.component';
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

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'admin', component: AdminHomeComponent,
    children:[
      { path: 'home', component: HomeComponent},
      { path: 'menus', component: GridMenusComponent},
      { path: 'menus/:id', component: FormMenusComponent},
      { path: 'pantallas', component: GridPantallasComponent},
      { path: 'pantallas/:id', component: FormPantallasComponent},
      { path: 'roles', component: GridRolesComponent},
      { path: 'roles/:id', component: FormRolesComponent},
      { path: 'paises' , component: GridPaisesComponent },
      { path: 'paises/:id' , component: FormPaisesComponent },
      { path: 'regiones', component: GridRegionesComponent},
      { path: 'regiones/:id', component: FormRegionesComponent},
      { path: 'provincias', component: GridProvinciasComponent},
      { path: 'provincias/:id', component: FormProvinciasComponent},
      { path: 'comunas', component: GridComunasComponent },
      { path: 'comunas/:id', component: FormComunasComponent},
      { path: 'ciudades', component: GridCiudadesComponent},
      { path: 'ciudades/:id', component: FormCiudadesComponent},
      { path: 'empresas', component: GridEmpresasComponent},
      { path: 'empresas/:id', component: FormEmpresasComponent},
      { path: 'categorias', component: GridCategoriasComponent},
      { path: 'categorias/:id', component: FormCategoriasComponent}
  
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }