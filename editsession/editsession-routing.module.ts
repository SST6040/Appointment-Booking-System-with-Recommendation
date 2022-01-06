import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditsessionPage } from './editsession.page';

const routes: Routes = [
  {
    path: '',
    component: EditsessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditsessionPageRoutingModule {}
