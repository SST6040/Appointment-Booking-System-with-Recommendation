import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcnstaffidPageRoutingModule } from './editcnstaffid-routing.module';

import { EditcnstaffidPage } from './editcnstaffid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditcnstaffidPageRoutingModule
  ],
  declarations: [EditcnstaffidPage]
})
export class EditcnstaffidPageModule {}
