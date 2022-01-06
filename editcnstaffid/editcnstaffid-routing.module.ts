import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcnstaffidPage } from './editcnstaffid.page';

const routes: Routes = [
  {
    path: '',
    component: EditcnstaffidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcnstaffidPageRoutingModule {}
