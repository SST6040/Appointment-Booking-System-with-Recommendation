import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounHomePage } from './coun-home.page';

const routes: Routes = [
  {
    path: '',
    component: CounHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CounHomePageRoutingModule {}
