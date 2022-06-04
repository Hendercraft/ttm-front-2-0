import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AProposPageRoutingModule } from './a-propos-routing.module';

import { AProposPage } from './a-propos.page';
import {ContactFormComponent} from '../../Form/a-propos/contact-form/contact-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AProposPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    AProposPage
  ],
  declarations: [AProposPage, ContactFormComponent]
})
export class AProposPageModule {}
