import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounProfilePage } from './coun-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CounProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CounProfilePageRoutingModule {}
