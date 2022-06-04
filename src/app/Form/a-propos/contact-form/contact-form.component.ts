import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ContactInfo} from '../../../Pages/a-propos/ContactInfo';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
  ) {
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]
      ],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required], Validators.email],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], //Accept only number
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }


  onSubmit(): void {
    console.log(this.contactForm);
    const contactInfo: ContactInfo = new ContactInfo();
    contactInfo.name = this.contactForm.value.name;
    contactInfo.lastName = this.contactForm.value.lastName;
    contactInfo.email = this.contactForm.value.email;
    contactInfo.phone = this.contactForm.value.phone;
    contactInfo.subject = this.contactForm.value.subject;
    contactInfo.message = this.contactForm.value.message;
    if (this.contactForm.valid) {
      this.api.sendAboutContactForm(contactInfo).subscribe(response => console.log(response));
    } else {
      console.log('the form is invalid !');
    }


  }
}
