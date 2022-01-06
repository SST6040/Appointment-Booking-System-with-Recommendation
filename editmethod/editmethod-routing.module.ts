import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditmethodPage } from './editmethod.page';

const routes: Routes = [
  {
    path: '',
    component: EditmethodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditmethodPageRoutingModule {}
