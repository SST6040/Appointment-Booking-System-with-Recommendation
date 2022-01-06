import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { RecomService } from '../services/recom.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

import { CreateRecordService } from '../services/create-record.service';


@Component({
  selector: 'app-issue',
  templateUrl: './issue.page.html',
  styleUrls: ['./issue.page.scss'],
})
export class IssuePage implements OnInit {

  

  constructor(private router:Router,
    
    private navCtrl:NavController,
    private formB:FormBuilder,
    public afAuth:AngularFireAuth,
    private alertCtrl:AlertController,
    private afs:AngularFirestore,
    private recom:RecomService,
    private createrec:CreateRecordService,
    private ngzone:NgZone,
   
   ) { }

    issueForm = this. formB.group({
      q1:['',Validators.required]
      
        
    })

  ngOnInit() {
   this.recom.GetIssue()
  }


getIssue(){
  var rbval = this.issueForm.value.q1;

  
  if (rbval!=null){
    if(rbval==='01'){
      var userIssue = document.getElementById('10issue').innerText.slice(0,10);
       this.storeToFB(userIssue)
      
    }

    else if(rbval==='02'){
     var userIssue = document.getElementById('20').innerText;
     this.storeToFB(userIssue)
    }

    else if(rbval==='03'){
      var userIssue = document.getElementById('30').innerText;
      
      this.storeToFB(userIssue)
    }

    else if(rbval==='04'){
      var userIssue = document.getElementById('40').innerText;
      
      this.storeToFB(userIssue)
    }

    else if(rbval==='05'){
      var userIssue = document.getElementById('50').innerText;
      
      this.storeToFB(userIssue)
    }
  }

   this.ngzone.run(()=>{
    this.router.navigate(['/confirm-booking']);})

}

storeToFB(issueobj){
  firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        const uid = user.uid;
          var historyList = []
          firebase.firestore().collection('history').get().then(historysnapshot=>{
          historysnapshot.docs.forEach(historydoc=>{
            historyList.push(historydoc.data())
          })

          if(historyList.length>=1){
            var i=historyList.length ;
            firebase.firestore().collection('history').doc(i.toString()).set({
              appointmentIssue:issueobj,
              studentuserID:uid,
            },{merge:true})
      }
    })
  }
})
// firebase.auth().onAuthStateChanged((user)=>{
//   if(user){
//     const uid = user.uid;

    
//       const dbRef = firebase.firestore().collection('User').doc(uid).collection('record');
//       var record = []
//       dbRef.get().then(snapshot=>{
            
//         snapshot.forEach(doc=>{
//           var myData = doc.data();
//            record.push(myData)

//         })

//         if(record.length>=1){
//           var i = record.length-1;
//           firebase.firestore().collection('User').doc(uid).collection('record').doc(i.toString()).set({
//           sissue:issueobj
//           },{merge:true})

//         }//end if2

//         else {
//           firebase.firestore().collection('User').doc(uid).collection('record').doc('0').set({
//             sissue:issueobj
//           },{merge:true})
//         }

//       })//endsnapshot

          
//   }  

 
    
  

// })


}//end function






     


GotoHome(){
 this.router.navigate(['/home'])
}

}
