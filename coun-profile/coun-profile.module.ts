import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CounProfilePageRoutingModule } from './coun-profile-routing.module';

import { CounProfilePage } from './coun-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CounProfilePageRoutingModule
  ],
  declarations: [CounProfilePage]
})
export class CounProfilePageModule {}
