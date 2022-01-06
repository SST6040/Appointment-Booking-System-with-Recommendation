import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CounEditprofilePageRoutingModule } from './coun-editprofile-routing.module';

import { CounEditprofilePage } from './coun-editprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CounEditprofilePageRoutingModule
  ],
  declarations: [CounEditprofilePage]
})
export class CounEditprofilePageModule {}
