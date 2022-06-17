import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})


/*This class manipulate the token given tby the api
* It can get data out of it like the userID, verify their validity, and refresh it*/
export class JwtTokenService {
  data = {
    token: this.jwtDecrypt(localStorage.getItem('token')), //The 5 min token given at login
    refreshedToken: null, //The 24h token
    userId: null //User Id stored in the token
  };

  constructor(private http: HttpClient) { }

  /*Check if a token has expired*/
  tokenAlive(exp) {
    return Date.now() < exp * 1000;
  }

  tokenIsValid()
  {
    if(localStorage.getItem('token')!=null)
    {
      this.data.token = this.jwtDecrypt(localStorage.getItem('token'));
      return this.tokenAlive(this.data.token.exp);
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
      this.data.token = this.jwtDecrypt(localStorage.getItem('token'));
      return this.data.token.user_id;
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
    this.data.token = this.jwtDecrypt(localStorage.getItem('access'));
    this.data.refreshedToken = this.jwtDecrypt(localStorage.getItem('refreshToken'));

    if (this.tokenAlive(this.data.token.exp)) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      return { Authorization: 'Bearer ' + this.data.token.jti };
    } else if (this.tokenAlive(this.data.refreshedToken.exp)) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      return { Authorization: 'Bearer' + this.data.refreshedToken.jti };
    } else {
      return null;
    }
  }

  isTokenValid(): boolean //TODO Optimise the hellout the if vodooshit that is happening here
  {
    const refreshedToken = localStorage.getItem('refreshedToken');
    if(!this.tokenIsValid() && !refreshedToken) //if the token is invalid, and we don't have a 24h token
    {
      const url = environment.apiURL +'token/refresh/';
      /*refresh the token or throw an error*/
      const observer = {
        next: response => {
          localStorage.setItem('refreshToken', response.data.access);
          this.data.refreshedToken = this.jwtDecrypt(localStorage.getItem('refreshToken'));
          return true;
        },
        error: err => {
          console.log('Refresh token failed');
          console.log(err);
          return false;},
        complete: () => console.log('Observer got a complete notification'),
      };

      console.log('refreshing token..');
      this.http.post(url, {
        refresh: localStorage.getItem('refresh')
      }).subscribe(observer);
    } else if (!this.tokenIsValid() && refreshedToken) //If the token is invalid, and we have a 24h token
    {
      console.log(this.data.refreshedToken);
      if (!this.tokenAlive(this.data.refreshedToken.exp)) { //check if it's still valid
        //if no we clear data
        localStorage.clear();
        this.data.token = null;
        this.data.refreshedToken = null;
        return false;
      }
    } else { //this mean our first token is good
      return true;
    }
  }
}
