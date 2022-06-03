import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ContactInfo} from './ContactInfo';

import {api} from '../services/api.services';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.page.html',
  styleUrls: ['./a-propos.page.scss'],
})
export class AProposPage implements OnInit {
  selectedTab = 'Projet';
  contactForm = this.formBuilder.group({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  formData;


  constructor(
    private formBuilder: FormBuilder,
    private api : ApiService,
    )
  { }

  ngOnInit() {
  }

  getCurrentModel(){
    return JSON.stringify(this.contactForm);
  }


  onSubmit(): void {
    const contactInfo: ContactInfo = new ContactInfo();
    contactInfo.name = this.contactForm.get('lastName').value;
    contactInfo.email = this.contactForm.get('email').value;
    contactInfo.phone = this.contactForm.get('photo').value;
    contactInfo.subject = this.contactForm.get('subject').value;
    contactInfo.message = this.contactForm.get('message').value;
    this.api.sendAboutContactForm(contactInfo)

    //TODO TRANSFORM VUE FUNCTION TO ANGUALRONE mettre toute la comunication dans un service?
    // Process the contactForm data here
  //   http.post("community/contact/create/", {"name":this.name, "last_name":this.last_name, "email":this.email, "phone":this.phone, "subject":this.subject, "message":this.message}, {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.token}`
  //     }
  //   })
  //     .then(response =>{
  //       console.log(response)
  //       this.name = null
  //       this.last_name = null
  //       this.email = null
  //       this.phone = null
  //       this.subject = null
  //       this.message = null
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // },

  }
}
