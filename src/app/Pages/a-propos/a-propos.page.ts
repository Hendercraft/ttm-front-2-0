import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ContactInfo} from './ContactInfo';
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


  constructor(
    private formBuilder: FormBuilder,
    )
  { }

  ngOnInit() {
  }

  getCurrentModel(){
    return JSON.stringify(this.contactForm);
  }


  onSubmit(): void {
    //TODO TRANSFORM VUE FUNCTION TO ANGUALRONE
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
