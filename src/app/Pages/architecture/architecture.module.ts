import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchitecturePageRoutingModule } from './architecture-routing.module';

import { ArchitecturePage } from './architecture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchitecturePageRoutingModule
  ],
  declarations: [ArchitecturePage]
})
export class ArchitecturePageModule {}
