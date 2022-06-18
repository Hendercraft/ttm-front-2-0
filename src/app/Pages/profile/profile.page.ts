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
  establishmentFrom: any;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone, //used to resized text area
    private api: ApiService
  ) { }

  //TODO Check ou le trigger
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosizeDiscipline.resizeToFitContent(true));
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosizeRecherche.resizeToFitContent(true));
  }

  ngOnInit() {
    this.ipFrom = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required], Validators.email],
      address: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], //Accept only number
      town: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      workInCompagnie: [''],
      compagnie:[''],
      compagnieTime:['']
  });
    this.disciplineFrom = this.fb.group({
      disciplineName:[''],
      disciplineText: ['']
    });

    this.rechercheFrom = this.fb.group({
      rechercheName:[''],
      rechercheText: ['']
    });

    this.establishmentFrom = this.fb.group({
      establishmentName:[''],
      labName: [''],
      establishmentText: ['']
    });


  }

  ipOnSubmit(){

  }

  disciplineOnSubmit(){

  }

  rechercheOnSubmit() {

  }

  establishmentOnSubmit() {

  }
}
