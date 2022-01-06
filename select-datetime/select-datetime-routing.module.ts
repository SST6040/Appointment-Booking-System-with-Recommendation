import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectDatetimePage } from './select-datetime.page';

const routes: Routes = [
  {
    path: '',
    component: SelectDatetimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectDatetimePageRoutingModule {}
