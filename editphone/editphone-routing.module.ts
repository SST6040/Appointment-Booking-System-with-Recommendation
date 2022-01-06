import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditphonePage } from './editphone.page';

const routes: Routes = [
  {
    path: '',
    component: EditphonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditphonePageRoutingModule {}
