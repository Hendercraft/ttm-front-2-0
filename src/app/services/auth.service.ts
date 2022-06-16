import { Injectable } from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
   private http: HttpClient
  ) { }

  register(username: string , fName: string,lName: string ,email: string, password: string){
    const url = environment.apiURL +'community/create/';
    return this.http.post<any>(url, {
      username, password,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      first_name: fName, last_name: lName , email
    });
  }

  login(username: string, password: string){
    const url = environment.apiURL +'token/';
    return this.http.post<any>(url,{
      username, password
    });
  }

}

