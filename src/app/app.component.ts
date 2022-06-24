import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../environments/environment'; //this file is replaced by the prod one if --dev
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {delay} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Router} from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements AfterViewInit, OnInit{

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  apiURL = environment.apiURL;
  constructor(private observer: BreakpointObserver, private router: Router ) {}

  ngOnInit(){}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)'])
      .pipe(delay(100), untilDestroyed(this)) //Adding delay otherwise it will misplace the navbar on reload
      .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  getCurrentPage(){
    switch (this.router.url){
      case '/':
        return 'Home';
      case '/a-propos':
        return 'A-propos';
      case '/urbanisme':
        return 'Urbanisme';
      case '/architecture':
        return 'Architecture';
      case '/hommes':
        return 'Hommes';
      case '/production':
        return 'Production';
    }
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('token') !== null;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }


}


