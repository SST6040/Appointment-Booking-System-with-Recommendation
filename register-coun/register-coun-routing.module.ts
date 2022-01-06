import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCounPage } from './register-coun.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCounPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCounPageRoutingModule {}
