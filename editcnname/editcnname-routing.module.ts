import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcnnamePage } from './editcnname.page';

const routes: Routes = [
  {
    path: '',
    component: EditcnnamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcnnamePageRoutingModule {}
