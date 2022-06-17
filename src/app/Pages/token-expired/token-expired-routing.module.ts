import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenExpiredPage } from './token-expired.page';

const routes: Routes = [
  {
    path: '',
    component: TokenExpiredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenExpiredPageRoutingModule {}
