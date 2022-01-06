import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditethnPage } from './editethn.page';

const routes: Routes = [
  {
    path: '',
    component: EditethnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditethnPageRoutingModule {}
