import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ContactInfo} from "../Pages/a-propos/ContactInfo";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }



  sendAboutContactForm(contactForm : ContactInfo ){
    const url = "community/contact/create/" //TODO DEFINE A GLOBAL VARIABLE FOR URL PATH
     return this.http.post<any>(url, contactForm.name,, httpOptions)
       .pipe(
         catchError(this.handleError('addHero', hero))
       );

  }
}
