import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectDatetimePageRoutingModule } from './select-datetime-routing.module';

import { SelectDatetimePage } from './select-datetime.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    
    SelectDatetimePageRoutingModule
  ],
  declarations: [SelectDatetimePage]
})
export class SelectDatetimePageModule {}
