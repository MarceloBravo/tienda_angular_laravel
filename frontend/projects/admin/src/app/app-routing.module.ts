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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menus', component: GridMenusComponent},
  { path: 'menus/:id', component: FormMenusComponent},
  { path: 'pantallas', component: GridPantallasComponent},
  { path: 'pantallas/:id', component: FormPantallasComponent},
  { path: 'roles', component: GridRolesComponent},
  { path: 'roles/:id', component: FormRolesComponent},
  { path: 'paises' , component: GridPaisesComponent },
  { path: 'paises/:id' , component: FormPaisesComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }