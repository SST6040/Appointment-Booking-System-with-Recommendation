import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditstudidPage } from './editstudid.page';

const routes: Routes = [
  {
    path: '',
    component: EditstudidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditstudidPageRoutingModule {}
