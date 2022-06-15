import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HommesPageRoutingModule } from './hommes-routing.module';

import { HommesPage } from './hommes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HommesPageRoutingModule
  ],
  declarations: [HommesPage]
})
export class HommesPageModule {}
