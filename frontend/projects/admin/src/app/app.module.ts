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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './shared/messages/messages.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/loading/loading.component';

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
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Necesario para poder utilizar la etiqueta <router-outlet></router-outlet>
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
