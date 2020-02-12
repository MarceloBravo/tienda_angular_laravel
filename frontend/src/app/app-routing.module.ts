import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { CompraComponent } from './pages/compra/compra.component';
import { PaypalSuccessComponent } from './pages/paypal-success/paypal-success.component';
import { PaypalCancelComponent } from './pages/paypal-cancel/paypal-cancel.component';
import { WebpaySuccessComponent } from './pages/webpay-success/webpay-success.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'comprar', component: CompraComponent},
  { path: 'paypal/success', component: PaypalSuccessComponent},
  { path: 'webpay/success', component: WebpaySuccessComponent},
  { path: 'paypal/cancel', component: PaypalCancelComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
