import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  userPkAndFk = {
    id : null,
    discipline: null,
    research: null,
    establishment: null
  };

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone, //used to resized text area
    private api: ApiService,
    private snackBar: MatSnackBar
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
      username : ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      town: ['',],
      postalCode: [''],
      phoneNumber:[''],
      workedOnTheSite: [''],
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
  //onSubmit
  ipOnSubmit(){
    const req =  this.api.updateUserData(this.ipFrom, this.userPkAndFk);
    if (req === null){
      console.log('there is an error while updating user data, response req was null');
    }else{
      const observer = {
        next: response => {
          this.snackBar.open('Votre profil a ??t?? mis ?? jour avec succ??s', 'Ok');
        },
        error: err => {
          this.snackBar.open('Il y a eu une erreur lors de la mise ?? jour de votre profil, veuillez r??essayez', 'Ok');
          //TODO Faire une snack bar pour chaque erreur car l'api renvoie un body different pour chaque type d'erreur :)
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      req.subscribe(observer);
    }
  }

  disciplineOnSubmit() {
    if(this.userPkAndFk.discipline === null) { //we need to create a new entry
      const observer = {
        next: response => {
          this.userPkAndFk.discipline = response.id;
          //Since for some reasons we user ALSO has a ref to the discipline we also need to update it
          this.ipOnSubmit();
          this.snackBar.open('Votre discipline a ??t?? cr??e avec succ??s', 'Ok');
        },
        error: err => {
          this.snackBar.open('Il y a eut une erreur lors de la cr??ation de votre disciple, Veuillez ressayer', 'Ok');
          console.log(err);
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      this.api.createDiscipline(this.userPkAndFk.id, this.disciplineFrom).subscribe(observer);
    }else{ //we modify the entry
      const observer = {
        next: response => {
          this.snackBar.open('Votre discipline ?? ??t?? mis a jour avec succ??s', 'Ok');
        },
        error: err => {
          this.snackBar.open('Il y a eu une erreur lors de la mise ?? jour de votre discipline, ' +
            'veuillez r??essayez', 'Ok');
          console.log(err);
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      this.api.updateUserDiscipline(
        this.userPkAndFk.id,
        this.userPkAndFk.discipline,
        this.disciplineFrom
      ).subscribe(observer);
    }
  }

  researchOnSubmit() {
    if(this.userPkAndFk.research === null) { //we need to create a new entry
      const observer = {
        next: response => {
          this.userPkAndFk.research = response.id;
          //Since for some reasons we user ALSO has a ref to the discipline we also need to update it
          this.ipOnSubmit();
          this.snackBar.open('Votre champ de recherche a ??t?? cr??e avec succ??s', 'Ok');
        },
        error: err => {
          this.snackBar.open('Il y a eut une erreur lors de la cr??ation de votre champ de recherche, Veuillez ressayer', 'Ok');
          console.log(err);
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      this.api.createResearchField(this.userPkAndFk.id, this.rechercheFrom).subscribe(observer);
    }else{ //we modify the entry
      const observer = {
        next: response => {
          this.snackBar.open('Votre champ de recherche a ??t?? mis a jour avec succ??s', 'Ok');
        },
        error: err => {
          this.snackBar.open('Il y a eu une erreur lors de la mise ?? jour de votre champ de recherche, ' +
            'veuillez r??essayez', 'Ok');
          console.log(err);
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      this.api.updateUserResearchField(
        this.userPkAndFk.id,
        this.userPkAndFk.research,
        this.rechercheFrom
      ).subscribe(observer);
    }
  }

  establishmentOnSubmit() {
    if(this.userPkAndFk.establishment === null) { //we need to create a new entry
      const observer = {
        next: response => {
          this.userPkAndFk.research = response.id;
          //Since for some reasons we user ALSO has a ref to the discipline we also need to update it
          this.ipOnSubmit();
          this.snackBar.open('Votre ??tablissement de recherche a ??t?? cr??e avec succ??s', 'Ok');
        },
        error: err => {
          this.snackBar.open('Il y a eut une erreur lors de la cr??ation de votre ??tablissement de recherche, Veuillez ressayer', 'Ok');
          console.log(err);
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      this.api.createResearchEstablishment(this.userPkAndFk.id, this.establishmentFrom).subscribe(observer);
    }else{ //we modify the entry
      const observer = {
        next: response => {
          this.snackBar.open('Votre ??tablissement de recherche a ??t?? mis ?? jour avec succ??s', 'Ok');
        },
        error: err => {
          this.snackBar.open('Il y a eu une erreur lors de la mise ?? jour de votre ??tablissement de recherche, ' +
            'veuillez r??essayez', 'Ok');
          console.log(err);
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      this.api.updateUserResearchEstablishment(
        this.userPkAndFk.id,
        this.userPkAndFk.establishment,
        this.establishmentFrom
      ).subscribe(observer);
    }

  }

  //getter

  /*Fetch user personal information and put it to the view, based on the response, do the same for the other tabs*/
  getUserData() {
    const req = this.api.getCurrentUserData();
    if (req === null) {
      console.log('there is an error while fetching user data, response req was null');
    } else {
      const observer = {
        next: response => {
          console.log(response);
          this.putUserDataToView(response);
          this.userPkAndFk.id = response.id; //store the user id as we might need it for post request later
          if (response.disciplineFK !==null){
            this.getUserDiscipline(response.disciplineFK);
            this.userPkAndFk.discipline = response.disciplineFK;
          }
          if (response.researchFieldFK !==null){
            this.getUserResearchField(response.researchFieldFK);
            this.userPkAndFk.research = response.researchFieldFK;

          }
          if (response.researchEstablishmentFK !==null){
            this.getUserEstablishment(response.researchEstablishmentFK);
            this.userPkAndFk.establishment = response.researchEstablishmentFK;
          }
        },
        error: err => {
          console.log('there is an error while fetching user data');
          console.log(err);
        },
        complete: () => console.log('Observer got a complete notification'),
      };
      req.subscribe(observer);
    }
  }

  getUserEstablishment(fk){
    const observer = {
      next: response => {
        console.log(response);
        this.putUserEstablishmentToView(response);
      },
      error: err => {
        console.log('there is an error while fetching ResearchField');
        console.log(err);
      },
      complete: () => console.log('Observer got a complete notification'),
    };
    this.api.getEstablishment(fk).subscribe(observer);
  }

  getUserDiscipline(fk){
    const observer = {
      next: response => {
        console.log(response);
        this.putUserDisciplineToView(response);
      },
      error: err => {
        console.log('there is an error while fetching discipline');
        console.log(err);
      },
      complete: () => console.log('Observer got a complete notification'),
    };
    this.api.getDiscipline(fk).subscribe(observer);
  }


  getUserResearchField(fk){
    const observer = {
      next: response => {
        console.log(response);
        this.putUserResearchFieldToView(response);
      },
      error: err => {
        console.log('there is an error while fetching ResearchField');
        console.log(err);
      },
      complete: () => console.log('Observer got a complete notification'),
    };
    this.api.getResearchField(fk).subscribe(observer);

  }


  //putter to push to the view

  putUserDisciplineToView(data){
    this.disciplineFrom.get('disciplineName').setValue(data.discipline);
    this.disciplineFrom.get('disciplineText').setValue(data.commentsDiscipline);
  }




  putUserResearchFieldToView(data){
    this.rechercheFrom.get('rechercheName').setValue(data.researchField);
    this.rechercheFrom.get('rechercheText').setValue(data.commentsResearch);
  }


  putUserEstablishmentToView(data){
    this.establishmentFrom.get('labName').setValue(data.laboratory);
    this.establishmentFrom.get('establishmentName').setValue(data.establishment);
    this.establishmentFrom.get('establishmentText').setValue(data.commentsEstablishment);
  }



  putUserDataToView(user){
    this.ipFrom.get('username').setValue(user.username);
    this.ipFrom.get('lastName').setValue(user.last_name);
    this.ipFrom.get('firstName').setValue(user.first_name);
    this.ipFrom.get('email').setValue(user.email);

    //TODO DEFINE A CLEAR WAY TO STORE ADDRESS AND SLICE POSTAL CODE
    if (user.postalAdress){
      const addressSliced = this.sliceUserAddress(user.postalAdress);
      this.ipFrom.get('address').setValue(addressSliced[0]);
      this.ipFrom.get('town').setValue(addressSliced[1]);
      this.ipFrom.get('postalCode').setValue(addressSliced[2]);
    }
    this.ipFrom.get('phoneNumber').setValue(user.phoneNumber);


    this.ipFrom.get('workedOnTheSite').setValue(user.workedOnTheSite);
    this.ipFrom.get('compagnie').setValue(user.workedInCompany);
    this.ipFrom.get('compagnieTime').setValue(user.workTimeDuration);
  }



  //miscellaneous
  sliceUserAddress(address){
    return address.split('@');
  }
}
