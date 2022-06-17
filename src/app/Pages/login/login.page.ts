import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  errorMessage = '';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',
        [Validators.required]],
      password: ['', [Validators.required,]]
    });
  }

  submitForm(){
    const observer = { // will handler the return value of to subscribe think of it as a match of lambada
      next: response => this.loginSucess(response),
      error: err => this.errorHandler(err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.auth.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    ).subscribe(observer);
  }

  private errorHandler(err) {
    console.log(err);
    this.errorMessage = 'Aucun compte utilisateur possèdent ce mot de passe n\'a été trouvé, vérifier votre saisie';

  }

  private loginSucess(response){
    localStorage.setItem('token', response.access);
    console.log(response);
    console.log(response.access);
    localStorage.setItem('refresh', response.refresh);
    this.router.navigate(['']);
  }
}
