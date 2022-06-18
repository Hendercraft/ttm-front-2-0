import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ContactInfo} from '../Pages/a-propos/ContactInfo';
import {environment} from '../../environments/environment';
import {JwtTokenService} from './jwt-token.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private jwt: JwtTokenService
  ) {
  }


  sendAboutContactForm(contactForm: ContactInfo) {
    const url = environment.apiURL +'community/contact/create/';
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


  getCurrentUserData(){
    if (this.jwt.isAnyTokenValid()){
      const userInf = this.jwt.jwtDecrypt(this.jwt.getToken());
      const url = environment.apiURL +'community/' + userInf.user_id;
      return this.http.get<any>(url);
    }else{
      return null;
    }
  }
}
