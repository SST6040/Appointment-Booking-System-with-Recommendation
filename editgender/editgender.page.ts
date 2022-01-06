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
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editgender',
  templateUrl: './editgender.page.html',
  styleUrls: ['./editgender.page.scss'],
})
export class EditgenderPage implements OnInit {

  constructor(private crt:CreateRecordService,
    private ngzone:NgZone,
    private router:Router,
    public formB:FormBuilder,
    private alertCtrl:AlertController) { }

    newGenderForm = this.formB.group({
      newGender:[''],})

  ngOnInit() {
  }
  // var valgender = this.profileForm.value.gender;


  async updateGender(){

   
    var newgender = this.newGenderForm.value.newGender;

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        const uid = user.uid;

          firebase.firestore().collection('User').doc(uid).update({
            gender:newgender
            
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




  
 




 

  


