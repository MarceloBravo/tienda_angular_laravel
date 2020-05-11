import { Component, OnInit } from '@angular/core';
import { LoginAdminService } from '../services/login-admin.service';
import { loginInterface } from '../interfaces/login';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  
autenticado: Boolean = false;
  private loginData: loginInterface = {
    nickname: null,
    password: null,
    token: null,
    remember: false
  };
  public URL = '';

  constructor (
    private _loginService: LoginAdminService,
    private _mensajeService: MessagesService,
    private router: Router
  ){
    this.URL = this.router.url;
    this.checkUserDataLocalStorage();
  }

  ngOnInit() {
    
  }

  private checkUserDataLocalStorage(){
    var data = sessionStorage.getItem('login');

    //console.log(data);
    if(data == null){
      console.log('sessionstorage != null')
      var data = localStorage.getItem('login');
      if(data != null && data)
      {
        this.loginData = JSON.parse(data);
        this.autenticar(this.loginData.nickname, this.loginData.password);
        console.log('autenticando...')
      }
      
    }
    //else{
    //  this.router.navigate(['/']);
    //}
  }

  private async autenticar(nickname: string, password: string, remember: boolean = false){
    var res: string = await this._loginService.autenticar(nickname, password, remember);
    if(res === 'Ok')
    {
      this.autenticado = true;
      this.router.navigate(['/admin/home']);
    }else{
      this._mensajeService.mostrarMensaje(res, 'danger');
      this.router.navigate(['/']);
    }
  }}
