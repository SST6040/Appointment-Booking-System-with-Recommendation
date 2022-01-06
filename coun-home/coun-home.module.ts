import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CounHomePageRoutingModule } from './coun-home-routing.module';

import { CounHomePage } from './coun-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CounHomePageRoutingModule
  ],
  declarations: [CounHomePage]
})
export class CounHomePageModule {}
