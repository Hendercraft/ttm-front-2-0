import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  errorMessage = '';
  registerForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['',
        [Validators.required]],
      fName: ['', [Validators.required,]],
      lName: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      rPassword: ['', [Validators.required,]],


    });


  }

  ngOnInit() {
  }


  submitForm(){
    if (this.registerForm.value.password === this.registerForm.value.rPassword){
      const observer = { // will handler the return value of to subscribe think of it as a match of lambada
        next: x => console.log('Observer got a next value: ' + x),
        error: err => this.errorHandler(err),
        complete: () => console.log('Observer got a complete notification'),
      };
      this.auth.register(
        this.registerForm.value.username,
        this.registerForm.value.fName,
        this.registerForm.value.lName,
        this.registerForm.value.email,
        this.registerForm.value.password
      ).subscribe(observer);
    }else {
      this.errorMessage = 'Les deux mots de passes ne correspondent pas !';
    }
  }
  errorHandler(error){
      console.log(error);
      if (error.error.username){
        this.errorMessage = 'Un utilisateur avec ce nom d\'utilisateur existe deja';
      }else if (error.error.email){
        this.errorMessage = 'Il semble y avoir un erreur dans l\'adresse email';
      }
  }
}
