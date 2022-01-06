import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRecordService } from '../services/create-record.service';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { FormBuilder,FormControl, Validators,FormGroup } from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AuthService } from '../services/auth.service';
import { alertController } from '@ionic/core';
import { Alert } from 'selenium-webdriver';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editname',
  templateUrl: './editname.page.html',
  styleUrls: ['./editname.page.scss'],
})
export class EditnamePage implements OnInit {

  constructor(private crt:CreateRecordService,
    private ngzone:NgZone,
    private router:Router,
    public formB:FormBuilder,
    private alertCtrl:AlertController) { }

    newnameForm = this.formB.group({
      newName:[''],})

  ngOnInit() {
  }

  async updatename(){

   
    var newname = this.newnameForm.value.newName;

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        const uid = user.uid;

          firebase.firestore().collection('User').doc(uid).update({
            name:newname
            
          });
  }  
})//end auth
const alert =await this.alertCtrl.create({
  cssClass:'ionalert',
  header:'Update succesfully!',
  message:' Please refresh the profile page to view your new update.',
  buttons:['OK']
});

await alert.present();

const { role} = await alert.onDidDismiss();
this.ngzone.run(()=>{
  this.router.navigate(['/profile']);})
  }//end function

  GotoHome(){
    this.router.navigate(['/home'])
  }

}



 

  


