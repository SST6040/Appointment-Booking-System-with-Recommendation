import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder,FormControl, Validators,FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { alertController } from '@ionic/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { AlertController } from '@ionic/angular';

import { RecomService } from '../services/recom.service';



@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private formb:FormBuilder,
    public afAuth:AngularFireAuth,
    private alertCtrl:AlertController,
    private router:Router,
    private afFirestore:AngularFirestore,
    private ngzone:NgZone,
    private recom:RecomService) { }

  userTestForm = this.formb.group({
    q1:[0,Validators.required],
    q2:[0,Validators.required],
    q3:[0,Validators.required],
    q4:[0,Validators.required],
    q5:[0,Validators.required],
    q6:[0,Validators.required],
    q7:[0,Validators.required],
    q8:[0,Validators.required],
    q9:[0,Validators.required]
      
  })

  ngOnInit() {
  }



 

CheckDepressed(){

  const testmark = parseInt(this.userTestForm.value.q1)+ parseInt(this.userTestForm.value.q2)
  +parseInt(this.userTestForm.value.q3)+parseInt(this.userTestForm.value.q4)+parseInt(this.userTestForm.value.q5)+
  parseInt(this.userTestForm.value.q6)+parseInt(this.userTestForm.value.q7)+parseInt(this.userTestForm.value.q8)+
  parseInt(this.userTestForm.value.q9);
  
  if(testmark > 4){
    const isdepressed = 'depression';
    return isdepressed;
  }

  else{
    const isdepressed = 'no depression';
    return isdepressed;
  }

}


submitTest(){
  
  var isdepressed;
  
  var testmark = parseInt(this.userTestForm.value.q1)+ parseInt(this.userTestForm.value.q2)
  +parseInt(this.userTestForm.value.q3)+parseInt(this.userTestForm.value.q4)+parseInt(this.userTestForm.value.q5)+
  parseInt(this.userTestForm.value.q6)+parseInt(this.userTestForm.value.q7)+parseInt(this.userTestForm.value.q8)+
  parseInt(this.userTestForm.value.q9);
  
  
  if(testmark > 4){
   isdepressed = 'depression';
    
  }

  else{
    isdepressed = 'no depression';
    
  }
  
  

  firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        const uid = user.uid;

        const UserCollRef = this.afFirestore.collection('User').doc(uid)
        
        UserCollRef.update({testmark:testmark});
        UserCollRef.update({isDepressed:isdepressed});
        
        

          // this.ngzone.run(()=>{
          // this.router.navigate(['/select-counsellor']);})
          
      }
       this.ngzone.run(()=>{
          this.router.navigate(['/select-counsellor']);})
      }
  
      
  )}
  
 

    GotoHome(){
      this.router.navigate(['/home'])
    }

}


