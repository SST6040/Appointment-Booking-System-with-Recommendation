import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcnnamePageRoutingModule } from './editcnname-routing.module';

import { EditcnnamePage } from './editcnname.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditcnnamePageRoutingModule
  ],
  declarations: [EditcnnamePage]
})
export class EditcnnamePageModule {}
