import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounEditprofilePage } from './coun-editprofile.page';

const routes: Routes = [
  {
    path: '',
    component: CounEditprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CounEditprofilePageRoutingModule {}
