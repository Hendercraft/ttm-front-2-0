import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ContactInfo} from '../Pages/a-propos/ContactInfo';
import {environment} from '../../environments/environment';
import {JwtTokenService} from './jwt-token.service';
import {FormGroup} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private jwt: JwtTokenService
  ) {
  }

  //getter

  /*Return the current user data in a promise*/
  getCurrentUserData(){
    if (this.jwt.isAnyTokenValid()){
      const userInf = this.jwt.jwtDecrypt(this.jwt.getToken());
      const url = environment.apiURL +'community/' + userInf.user_id;
      return this.http.get<any>(url);
    }else{
      return null;
    }
  }
  /*Return the discipline of the given key in a promise*/
  getDiscipline(key){
    const url = environment.apiURL + `community/discipline/${key}/`;
    return this.http.get<any>(url);
  }

  getResearchField(key){
    const url = environment.apiURL + `community/champRecherche/${key}/`;
    return this.http.get<any>(url);
  }

  getEstablishment(key){
    //TODO Change the endpoint once the grammar error has been fixed in the back
    const url = environment.apiURL + `community/etablisementRecherche/${key}/`;
    return this.http.get<any>(url);
  }

  //updater

  updateUserDiscipline(userId, fk, data){
    const url = environment.apiURL + `community/discipline/update/${fk}/`;
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.jwt.getToken()}`
      })
    };
    return this.http.put<any>(url,{
      discipline: data.value.disciplineName,
      commentsDiscipline: data.value.disciplineText,
      user: userId
    },httpOptions);
  }

  updateUserResearchField(userId, fk, data){
    const url = environment.apiURL + `community/champRecherche/update/${fk}/`;
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.jwt.getToken()}`
      })
    };
    return this.http.put<any>(url,{
      researchField: data.value.rechercheName,
      commentsResearch: data.value.rechercheText,
      user: userId
    },httpOptions);
  }

  updateUserResearchEstablishment(userId, fk, data){
    const url = environment.apiURL + `community/etablisementRecherche/update/${fk}/`;
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.jwt.getToken()}`
      })
    };
    return this.http.put<any>(url,{
      laboratory: data.value.labName,
      establishment: data.value.establishmentName,
      commentsEstablishment : data.value.establishmentText,
      user: userId
    },httpOptions);
  }



  /*Make a put request to the API to update the current user data, return a promise contenting the answer*/
  updateUserData(userData, keys){
    if (this.jwt.isAnyTokenValid()){
      const userInf = this.jwt.jwtDecrypt(this.jwt.getToken());
      const url = environment.apiURL +'community/' + userInf.user_id +'/';
      const httpOptions = {
        headers: new HttpHeaders({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${this.jwt.getToken()}`
        })
      };
      return this.http.put(url,{
        username: userData.value.username,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        last_name: userData.value.lastName,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        first_name: userData.value.firstName,
        email: userData.value.email,
        postalAdress: userData.value.address + '@' + userData.value.town + '@' + userData.value.postalCode,
        workedOnTheSite : userData.value.workedOnTheSite,
        workedInCompany: userData.value.compagnie,
        workTimeDuration: userData.value.compagnieTime,
        disciplineFK: keys.discipline,
        researchFieldFK: keys.research,
        researchEstablishmentFK: keys.establishment
      }, httpOptions);
    }else{
      return null;
    }
  }

  //send & create

  /*Send the contact from to the API via post, return the response in a promise */
  sendAboutContactForm(contactForm: ContactInfo) {
    const url = environment.apiURL +'community/contact/create/';
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.jwt.getToken()}`
      })
    };
    return this.http.post<any>(url, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      name: contactForm.name, last_name: contactForm.lastName,
      email: contactForm.email, phone: contactForm.phone, subject: contactForm.subject, message: contactForm.message
    }, httpOptions);
  }

  sendTestimony(testimonyForm: FormGroup){
    const url = environment.apiURL +'community/temoignages/create/'; //yes there is a s at the end for some reasons
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.jwt.getToken()}`
      })
    };
    return this.http.post<any>(url,{
      testimony: testimonyForm.value.text,
      user: this.jwt.jwtDecrypt(this.jwt.getToken()).user_id
    }, httpOptions);
  }



  /*Create a new entry to the discipline tale via post, and return a promise*/
  createDiscipline(userId, data){
    const url = environment.apiURL + 'community/discipline/create/';
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.jwt.getToken()}`
      })
    };
    return this.http.post<any>(url,{
      discipline: data.value.disciplineName,
      commentsDiscipline: data.value.disciplineText,
      user: userId
    },httpOptions);
  }


  /*Create a new entry to the researchField tale via post, and return a promise*/
  createResearchField(userId, data){
    const url = environment.apiURL + 'community/champRecherche/create/';
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.jwt.getToken()}`
      })
    };
    return this.http.post<any>(url,{
      researchField: data.value.rechercheName,
      commentsResearch: data.value.rechercheText,
      user: userId
    },httpOptions);
  }
  /*Create a new entry to the researchField tale via post, and return a promise*/
  createResearchEstablishment(userId, data){
    const url = environment.apiURL + 'community/etablisementRecherche/create/'; //TODO fix the url in the back
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.jwt.getToken()}`
      })
    };
    return this.http.post<any>(url,{
      laboratory: data.value.labName,
      establishment: data.value.establishmentName,
      commentsEstablishment : data.value.establishmentText,
      user: userId
    },httpOptions);
  }


}
