import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-temoignage',
  templateUrl: './temoignage.page.html',
  styleUrls: ['./temoignage.page.scss'],
})
export class TemoignagePage implements OnInit {

  testimonyForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  private snackBar: MatSnackBar
){}

  ngOnInit() {
    this.testimonyForm = this.fb.group( {
      text : ['', [Validators.required]],
      }
    );
  }


  onSubmit() {
    const observer = {
      next: response => {
        this.snackBar.open('Votre témoignage à été enregistre avec succès !','Ok');
      },
      error: err => {
        this.snackBar.open('Il y a eut une erreur lors de l\'enregistrement de votre témoignage', 'Ok');
        console.log(err);
      },
      complete: () => console.log('Observer got a complete notification'),
    };
    this.api.sendTestimony(this.testimonyForm).subscribe(observer);
  }
}
