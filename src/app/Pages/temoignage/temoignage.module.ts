import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemoignagePageRoutingModule } from './temoignage-routing.module';

import { TemoignagePage } from './temoignage.page';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemoignagePageRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [TemoignagePage]
})
export class TemoignagePageModule {}
