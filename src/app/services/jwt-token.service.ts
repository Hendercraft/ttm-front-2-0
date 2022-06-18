import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})


/*This class manipulate the token given tby the api
* It can get data out of it like the userID, verify their validity, and refresh it*/
export class JwtTokenService {
  data = {
    token: localStorage.getItem('token'),
    tokenDecrypted: this.jwtDecrypt(localStorage.getItem('token')), //The "5" min token given at login (more like 30)
    refreshedToken: null, //The "24h" token (more like 30min also)
    userId: null //User Id stored in the token
  };

  constructor(private http: HttpClient) { }

  /*Check if a token has expired*/
  tokenAlive(exp) {
    return Date.now() < exp * 1000;
  }

  /*Check if the 1st token is valid and store a decrypt copy on the structure*/
  tokenIsValid()
  {
    if(localStorage.getItem('token')!=null)
    {
      this.data.tokenDecrypted = this.jwtDecrypt(localStorage.getItem('token'));
      return this.tokenAlive(this.data.tokenDecrypted.exp);
    }
    else
    {
      return false;
    }
  }

  /*Return the user Id stored in the token in the local storage*/
  idConnectedUser() //TODO FINISH IT
  {
    if(localStorage.getItem('token'))
    {
      this.data.tokenDecrypted = this.jwtDecrypt(localStorage.getItem('token'));
      return this.data.tokenDecrypted.user_id;
    }
    else
    {
      return null;
    }

  }
 /*Decrypt the token return a sliced token for easier manipulation */
  jwtDecrypt(token) {
    if (token == null) {
      return null;
    } else {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    }
  }

  /*Return the jti part of the token to add it to the header of a http request*/
  authHeader() {
    this.data.tokenDecrypted = this.jwtDecrypt(localStorage.getItem('access'));
    this.data.refreshedToken = this.jwtDecrypt(localStorage.getItem('refreshToken'));

    if (this.tokenAlive(this.data.tokenDecrypted.exp)) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      return { Authorization: 'Bearer ' + this.data.tokenDecrypted.jti };
    } else if (this.tokenAlive(this.data.refreshedToken.exp)) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      return { Authorization: 'Bearer' + this.data.refreshedToken.jti };
    } else {
      return null;
    }
  }


  isAnyTokenValid(): boolean
  {
    const refreshToken = localStorage.getItem('refresh');
    if(!this.tokenIsValid() && !refreshToken) //if the token is invalid, and we don't have a token to ask for a refresh
    {
      return false;
    }else if (!this.tokenIsValid() && refreshToken){ //If the token is invalid, we have a token to ask for a refresh
      console.log(refreshToken);
      console.log('Old token is expired, trying to get a new one');
      let returnValue = false;
      const observer = {
        next: response => {
          localStorage.clear(); //clearing old token
          localStorage.setItem('token', response.data.access); //setting the new token
          this.data.token = localStorage.getItem('token');
          this.data.tokenDecrypted = this.jwtDecrypt(this.data.token);
          returnValue = true;
        },
        error: err => {
          console.log('Refresh token failed');
          console.log(err);
          this.data.token = null;
          this.data.tokenDecrypted = null;
          localStorage.clear();
          returnValue = false;
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      this.refreshToken().subscribe(observer);
      return returnValue;
    } else { //this mean our first token is good
      return true;
    }
  }


  getToken(){
    this.data.token = null;
    if (this.tokenIsValid()){
      this.data.token = localStorage.getItem('token');
      this.data.tokenDecrypted = this.jwtDecrypt(this.data.token);
    }else if (localStorage.getItem('refresh') !== null){
      const observer = {
        next: response => {
          localStorage.clear(); //clearing old token
          localStorage.setItem('token', response.data.access); //setting the new token
          this.data.token = localStorage.getItem('token');
          this.data.tokenDecrypted = this.jwtDecrypt(this.data.token);
        },
        error: err => {
          console.log('Refresh token failed');
          console.log(err);
          this.data.token = null;
          this.data.tokenDecrypted = null;
          localStorage.clear();
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      this.refreshToken().subscribe(observer);
    }
    return this.data.token;
  }
  refreshToken(): Observable<any>{ //refresh the token and return an observable
    const url = environment.apiURL +'token/refresh/';
    /*refresh the token or throw an error*/
    console.log('refreshing token..');
    return this.http.post(url,{
      refresh: localStorage.getItem('refresh')
    });
  }
}
