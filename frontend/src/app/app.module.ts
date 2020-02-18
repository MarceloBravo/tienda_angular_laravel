import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { RightSideCartComponent } from './shared/right-side-cart/right-side-cart.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './shared/cart/cart.component';
import { HttpClientModule } from  '@angular/common/http';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { FormsModule } from '@angular/forms';
import { ModalMessageComponent } from './shared/modal-message/modal-message.component';
import { CompraComponent } from './pages/compra/compra.component';
import { PaypalSuccessComponent } from './pages/paypal-success/paypal-success.component';
import { PaypalCancelComponent } from './pages/paypal-cancel/paypal-cancel.component';
import { WebpaySuccessComponent } from './pages/webpay-success/webpay-success.component';
import { LoadingComponent } from './shared/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RightSideCartComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    MessagesComponent,
    ModalMessageComponent,
    CompraComponent,
    PaypalSuccessComponent,
    PaypalCancelComponent,
    WebpaySuccessComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Necesario para poder utilizar la etiqueta <router-outlet></router-outlet>
    NgbModule,
    HttpClientModule,

    CarouselModule,
    BrowserAnimationsModule,
     RouterModule.forRoot([]),
     FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
