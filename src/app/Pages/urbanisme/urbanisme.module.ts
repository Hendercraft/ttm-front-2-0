import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UrbanismePageRoutingModule } from './urbanisme-routing.module';

import { UrbanismePage } from './urbanisme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UrbanismePageRoutingModule
  ],
  declarations: [UrbanismePage]
})
export class UrbanismePageModule {}
