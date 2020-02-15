import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Necesario para poder utilizar la etiqueta <router-outlet></router-outlet>
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
