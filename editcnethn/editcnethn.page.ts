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
  selector: 'app-editcnethn',
  templateUrl: './editcnethn.page.html',
  styleUrls: ['./editcnethn.page.scss'],
})
export class EditcnethnPage implements OnInit {

  constructor(private crt:CreateRecordService,
    private ngzone:NgZone,
    private router:Router,
    public formB:FormBuilder,
    private alertCtrl:AlertController) { }

    newCNEthnForm = this.formB.group({
      newCNEthn:[''],})

  ngOnInit() {
  }

 async updateCNEthn(){

   
    var newCNethn = this.newCNEthnForm .value.newCNEthn;

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        const uid = user.uid;
      

          firebase.firestore().collection('Counsellor').doc(uid).update({
            ethnicity:newCNethn
            
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
  this.router.navigate(['/coun-profile']);})
  }//end function
  
  GotoHome(){
    this.router.navigate(['/home'])
  }
}




    
  






  




   









  
 




 

  


