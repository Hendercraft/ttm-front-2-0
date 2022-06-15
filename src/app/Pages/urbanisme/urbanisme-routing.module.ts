import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrbanismePage } from './urbanisme.page';

const routes: Routes = [
  {
    path: '',
    component: UrbanismePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UrbanismePageRoutingModule {}
