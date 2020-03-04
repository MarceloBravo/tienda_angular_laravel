import { Component, OnInit } from '@angular/core';
import { LoginAdminService } from '../../services/login-admin.service';
import { MessagesService } from 'src/app/service/messages.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { loginInterface } from '../../interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginData: loginInterface = {
    nickname: null,
    password: null,
    token: null,
    remember: false
  };
  public loginForm: FormGroup = new FormGroup({
    nickname: new FormControl(),
    password: new FormControl()
  });


  constructor(
    private _loginService: LoginAdminService,
    private _mensajeService: MessagesService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.checkUserDataLocalStorage();
      this.inicarForm();
  }


  ngOnInit() {
  }


  private inicarForm(){
    this.loginForm = this.formBuilder.group({
      nickname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }


  private checkUserDataLocalStorage(){
    var data = localStorage.getItem('login');

    if(data != null){
      this.loginData = JSON.parse(data);
      this.autenticar(this.loginData.nickname, this.loginData.password, this.loginData.remember);
    }
  }


  login(){
    var nickname = <HTMLInputElement>document.getElementById('nickname');
    var password = <HTMLInputElement>document.getElementById('password');
    var rememberMe = <HTMLInputElement>document.getElementById('rememberMe');
    this.autenticar(nickname.value, password.value, rememberMe.checked);
  }


  private async autenticar(nickname: string, password: string, remember: boolean = false){
    var res: string = await this._loginService.autenticar(nickname, password, remember);
    if(res === 'Ok')
    {
      this.router.navigate(['/admin/home']);
    }else{
      this._mensajeService.mostrarMensaje(res, 'danger');
      this.router.navigate(['/']);
    }
  }
}
