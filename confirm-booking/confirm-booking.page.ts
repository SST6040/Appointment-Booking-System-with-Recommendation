import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CreateRecordService } from '../services/create-record.service';
import { RecomService } from '../services/recom.service';
import { SelectDatetimePage } from '../select-datetime/select-datetime.page';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.page.html',
  styleUrls: ['./confirm-booking.page.scss'],
})
export class ConfirmBookingPage implements OnInit {

  
  selectedIssue;

  constructor(private router:Router,
    
    private navCtrl:NavController,
    private formB:FormBuilder,
    public afAuth:AngularFireAuth,
    private alertCtrl:AlertController,
    private afFirestore:AngularFirestore,
    private recom:RecomService,
    private crt:CreateRecordService,
    private ngzone:NgZone,
    ) { }

 
  ngOnInit() {
   
    this.crt.DisplayIssue()
   
  }

  async confirm(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        const uid = user.uid;

          const dbRef = firebase.firestore().collection('history');
          var record = []
          dbRef.get().then(snapshot=>{
                
            snapshot.forEach(doc=>{
              var myData = doc.data();
               record.push(myData)
    
            })
    
            if(record.length>=1){
              var i = record.length ;
              
             
              
              firebase.firestore().collection('history').doc(i.toString()).set({
                recordID: 'Record '+i,            
                status:'success'
              },{merge:true})
    
             
            }//end if2
          })//endsnapshot

          
        }
        })

       

    
      const alert =await this.alertCtrl.create({
        cssClass:'ionalert',
        header:'Your booking is completed!',
        message:' Please go to Counselling Booking History page to view the booking.',
        buttons:['OK']
      });

      await alert.present();
      
      const { role} = await alert.onDidDismiss();

      this.ngzone.run(()=>{
        this.router.navigate(['/home']);})

          
  }


  cancel(){
    
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        const uid = user.uid;

        const dbRef = firebase.firestore().collection('history');
        var record = []
        dbRef.get().then(snapshot=>{
              
          snapshot.forEach(doc=>{
            var myData = doc.data();
             record.push(myData)
  
          })
  
          if(record.length>=1){
            var i = record.length ;
            
           
            
            firebase.firestore().collection('history').doc(i.toString()).delete()
  
           
          }//end if2
        })//endsnapshot
      }
      })

      
          
  }
 
  
  GotoHome(){
    this.router.navigate(['/home'])
  }


  
}
