import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokenExpiredPageRoutingModule } from './token-expired-routing.module';

import { TokenExpiredPage } from './token-expired.page';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TokenExpiredPageRoutingModule,
        MatCardModule
    ],
  declarations: [TokenExpiredPage]
})
export class TokenExpiredPageModule {}
