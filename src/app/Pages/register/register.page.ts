import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;


  constructor(
    private fb: FormBuilder,
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


  }

}
