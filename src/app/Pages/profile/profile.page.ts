import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('autosizeDiscipline') autosizeDiscipline: CdkTextareaAutosize;
  @ViewChild('autosizeRecherche') autosizeRecherche: CdkTextareaAutosize;

  selectedTab = 'information-personnelles';
  ipFrom: FormGroup;
  disciplineFrom: FormGroup;
  rechercheFrom: FormGroup;
  establishmentFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone, //used to resized text area
    private api: ApiService,
  ) {
  }

  //TODO Check ou le trigger
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosizeDiscipline.resizeToFitContent(true));
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosizeRecherche.resizeToFitContent(true));
  }

  ngOnInit() {
    this.getUserData();
    this.ipFrom = this.fb.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      town: ['',],
      postalCode: [''],
      phoneNUmber:[''],
      workInCompagnie: [''],
      compagnie: [''],
      compagnieTime: ['']
    });
    this.disciplineFrom = this.fb.group({
      disciplineName: [''],
      disciplineText: ['']
    });

    this.rechercheFrom = this.fb.group({
      rechercheName: [''],
      rechercheText: ['']
    });

    this.establishmentFrom = this.fb.group({
      establishmentName: [''],
      labName: [''],
      establishmentText: ['']
    });


  }

  ipOnSubmit() {

  }

  disciplineOnSubmit() {

  }

  rechercheOnSubmit() {

  }

  establishmentOnSubmit() {

  }


  getUserData() {
    const req = this.api.getCurrentUserData();
    if (req === null) {
      console.log('there is an error while fetching user data, response req was null');
    } else {
      const observer = {
        next: response => {
          const user = response;
          console.log(user);
          this.putUserDataToView(user);
        },
        error: err => {
          console.log('there is an error while fetching user data');
          console.log(err);
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      this.api.getCurrentUserData().subscribe(observer);
    }
  }

  getUserDisciple(){}

  getUserReshearchField(){

  }
  getUserEstablishement(){

  }
  putUserDataToView(user){
    console.log(user.postalAdress);
    this.ipFrom.get('lastName').setValue(user.last_name);
    this.ipFrom.get('firstName').setValue(user.first_name);
    this.ipFrom.get('email').setValue(user.email);

    //TODO DEFINE A CLEAR WAY TO STORE ADDRESS AND SLICE POSTAL CODE
    this.ipFrom.get('address').setValue(user.postalAdress);
    this.ipFrom.get('town').setValue(user.postalAdress);
    this.ipFrom.get('postalCode').setValue(user.postalAdress);

    this.ipFrom.get('workInCompagnie').setValue(user.workedOnTheSite);
    this.ipFrom.get('compagnie').setValue(user.workedInCompany);
    this.ipFrom.get('compagnieTime').setValue(user.workTimeDuration);
  }
}
