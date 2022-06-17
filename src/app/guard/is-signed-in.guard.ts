import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {JwtTokenService} from '../services/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {

  constructor(
    private jwt: JwtTokenService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // If token is okay => Access the page, otherwise try to refresh it, if we cannot,
    // we'll redirect the user to an error page asking him to re-login
      const isSignedIn = this.jwt.isTokenValid();

      if (isSignedIn !== true){//redirect to the error page
        this.router.navigate(['token-expired']);
      }

      return isSignedIn;
  }

}
