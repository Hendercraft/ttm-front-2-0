import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ContactInfo} from '../Pages/a-propos/ContactInfo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }


  sendAboutContactForm(contactForm: ContactInfo) {
    const url = 'community/contact/create/'; //TODO DEFINE A GLOBAL VARIABLE FOR URL PATH and add it via
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${localStorage.token}`
      })
    };
    return this.http.post<any>(url, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      name: contactForm.name, last_name: contactForm.lastName,
      email: contactForm.email, phone: contactForm.phone, subject: contactForm.subject, message: contactForm.message
    }, httpOptions);
  }
}

