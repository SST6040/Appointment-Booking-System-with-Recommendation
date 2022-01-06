import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcngenderPage } from './editcngender.page';

const routes: Routes = [
  {
    path: '',
    component: EditcngenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcngenderPageRoutingModule {}
