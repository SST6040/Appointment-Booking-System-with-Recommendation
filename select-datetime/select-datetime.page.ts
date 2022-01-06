import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';

import { RecomService } from '../services/recom.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateRecordService } from '../services/create-record.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-select-datetime',
  templateUrl: './select-datetime.page.html',
  styleUrls: ['./select-datetime.page.scss'],
})
export class SelectDatetimePage implements OnInit {

 

  constructor(private router:Router,
    
    private ngzone:NgZone,
    private recom:RecomService,
      private formB:FormBuilder,
    public afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private crt:CreateRecordService,
    private alertCtrl:AlertController
    
   ) { }

  ngOnInit() {
    this.recom.GetMethod()
    this.recom.GetSession()
 
    
  }

  methodForm = this.formB.group({
    q11:['',Validators.required]

  })

  mindate = new Date().toDateString().substring(4)

  suggestedtime;

chooseSuggestedTime(){
  var btnselected = document.getElementById('suggestT')
  var suggestTimeText = btnselected.innerText;
  this.suggestedtime = suggestTimeText.slice(suggestTimeText.length -5)


  btnselected.innerText = suggestTimeText
  btnselected.setAttribute('color','success')

  var originalTime = document.getElementById('time')
    originalTime.setAttribute('disabled',null)

    
  
}



    


GetDateTime(){

  
    var timeElement = document.getElementById('time')
    var stime = timeElement.innerHTML.substring(61);
    var newtime = stime.substring(12,17);
  
   
    var btnselected = document.getElementById('suggestT')
    btnselected.addEventListener('click',event=>{
      this.chooseSuggestedTime()
    })
    
    var date = document.getElementById('date').innerHTML.substring(62);
    var newdate = date.substring(0,10);

  //----------------------------getrecommended method----------------

  
    var rbval11 = this.methodForm.value.q11;
    var usermethod;

      if(rbval11!=null){
        if(rbval11==='suggested'){
          var result= document.getElementById('suggested').innerText.split('\n');
          usermethod = result[0];

        }
        else if (rbval11==='11'){
          usermethod = document.getElementById('11').innerText;
           
          }

        else if(rbval11==='12'){
        usermethod = document.getElementById('12').innerText;
         
        }
      }//end if

      var btngo = document.getElementById('proceed')
      btngo.removeAttribute('disabled')
      
    

//-----------------------check availability----------------------------

        
        var bookinglist=[{}];
        var currentbooking ={};
        var taken;
        
  //----------------get current booking detail --------------------
        firebase.firestore().collection('history').get().then(async allbooking=>{
          allbooking.docs.forEach(booking=>{
            var myData = {
            bcname:booking.data().bookedcounsellorName,
            bcemail:booking.data().bookedcounsellorEmail,
            bcgender:booking.data().bookedcounsellorGender,
            bcethn:booking.data().bookedcounsellorEthn,
            bapptime:booking.data().appointmentTime,
            bappdate:booking.data().appointmentDate,
            bappmethod:booking.data().appointmentMethod,
            bappissue:booking.data().appointmentIssue}
            
            bookinglist.push(myData)
          })




          if(bookinglist.length >=1){
          var i = Object.keys(bookinglist).length - 1;

         
          var currentemail ;

          firebase.firestore().collection('history').doc(i.toString()).get().then( async snapshot=>{
            currentemail = snapshot.data().bookedcounsellorEmail

            
            for(let i=0;i<bookinglist.length;i++){

              
              if( (bookinglist[i]['bcemail']===currentemail) && (bookinglist[i]['bappdate']===newdate) && (bookinglist[i]['bapptime']===newtime||this.suggestedtime ))
               {
                 taken=1;
                 i = bookinglist.length
               
             }
             else{
               taken=0;
             }
             
           }//end for

           if(taken===1){
             const alert = await this.alertCtrl.create({
                   
               header: 'Booking is taken!',
               subHeader: 'The booking time you selected is taken.',
               message: 'Please select again a new date and time. Thank you',
               buttons: ['OK']
             });
         
             await alert.present();
         
             const { role } = await alert.onDidDismiss();
             console.log('onDidDismiss resolved with role', role);
             
           }
 
           else if(taken===0){
             const alert = await this.alertCtrl.create({
                 
               header: 'You are good to go!',
               subHeader: 'The booking time you selected is available.',
               message: 'Please proceed to next step. Thank you',
               buttons: ['OK']
             });
         
             await alert.present();
         
             const { role } = await alert.onDidDismiss();
             console.log('onDidDismiss resolved with role', role);
             
           }
            

          })
           
        }       
        
        
          
        })//END SNAPSHOt



      
     
      
    }
          

            

          
          
          
        
    
ProceedBooking(){
  var timeElement = document.getElementById('time')
  var stime = timeElement.innerHTML.substring(61);
  var newtime = stime.substring(12,17);

 
  var btnselected = document.getElementById('suggestT')
  btnselected.addEventListener('click',event=>{
    this.chooseSuggestedTime()
  })
  

  
  var date = document.getElementById('date').innerHTML.substring(62);
  var newdate = date.substring(0,10);
  

  var rbval11 = this.methodForm.value.q11;
  var usermethod;

    if(rbval11!=null){
      if(rbval11==='suggested'){
        var result= document.getElementById('suggested').innerText.split('\n');
        usermethod = result[0];
       
        
      }
      else if (rbval11==='11'){
        usermethod = document.getElementById('11').innerText;
         
        }

      else if(rbval11==='12'){
      usermethod = document.getElementById('12').innerText;
       
      }
    }//end if}

  if (timeElement.getAttribute('disabled')){
    this.storeToFBwithoutTime(newdate,this.suggestedtime,usermethod)
     }
     
      else{this.storeToFB(newdate,newtime,usermethod)}
 
   
     this.ngzone.run(()=>{
       this.router.navigate(['/issue']);})
}
    



  GotoHome(){
    this.ngzone.run(()=>{
      this.router.navigate(['/select-datetime']);})
  }

  storeToFB(sdate:string,stime:string,smethod:string){
    var historyList = []
    firebase.firestore().collection('history').get().then(historysnapshot=>{
      historysnapshot.docs.forEach(historydoc=>{
        historyList.push(historydoc.data())
      })

      if(historyList.length>=1){
        var i=historyList.length ;
        firebase.firestore().collection('history').doc(i.toString()).set({
          appointmentDate:sdate,
          appointmentTime:stime,
          appointmentMethod:smethod
        },{merge:true})
      }
    })
    
    
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        const uid = user.uid;
    
      
          const dbRef = firebase.firestore().collection('User').doc(uid).collection('record');
          var record = []
          dbRef.get().then(snapshot=>{
                
            snapshot.forEach(doc=>{
              var myData = doc.data();
               record.push(myData)
    
            })
    
            if(record.length>=1){
              var i = record.length-1 ;
              this.afs.collection('User').doc(uid).collection('record').doc(i.toString()).set({
                sdate:sdate,
                stime:stime,
                smethod:smethod
              },{merge:true})
    
            }//end if2
    
            else {
              firebase.firestore().collection('User').doc(uid).collection('record').doc('0').set({
                sdate:sdate,
                stime:stime,
                smethod:smethod
              },{merge:true})
            }
          })//endsnapshot
    
              
      
      
      
    }
        
        
      
    
    })
    
    
    }//end function

    storeToFBwithoutTime(sdate:string,stime,smethod:string){
      var historyList = []
      firebase.firestore().collection('history').get().then(historysnapshot=>{
        historysnapshot.docs.forEach(historydoc=>{
          historyList.push(historydoc.data())
        })
  
        if(historyList.length>=1){
          var i=historyList.length ;
          firebase.firestore().collection('history').doc(i.toString()).set({
            appointmentDate:sdate,
            appointmentTime:stime,
            appointmentMethod:smethod
          },{merge:true})
        }
      })
    }

}
