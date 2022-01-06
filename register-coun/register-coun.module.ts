import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCounPageRoutingModule } from './register-coun-routing.module';

import { RegisterCounPage } from './register-coun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterCounPageRoutingModule
  ],
  declarations: [RegisterCounPage]
})
export class RegisterCounPageModule {}
