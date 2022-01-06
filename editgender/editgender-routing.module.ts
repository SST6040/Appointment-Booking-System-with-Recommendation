import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditgenderPage } from './editgender.page';

const routes: Routes = [
  {
    path: '',
    component: EditgenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditgenderPageRoutingModule {}
