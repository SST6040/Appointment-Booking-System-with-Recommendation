import { Component, NgZone, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { RecomService } from '../services/recom.service';
import { CreateRecordService } from '../services/create-record.service';
import { GlobalComponent } from '../global-component';
import { FormBuilder,FormControl, Validators,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-select-counsellor',
  templateUrl: './select-counsellor.page.html',
  styleUrls: ['./select-counsellor.page.scss'],
})
export class SelectCounsellorPage implements OnInit {

  
  constructor(private router:Router,
    private recom:RecomService,
    private afs:AngularFirestore,
    private ngzone:NgZone,
    private crt:CreateRecordService,
    public formB:FormBuilder,
    private afFirestore:AngularFirestore
   
    ) { }

    counsellorSelectForm = this.formB.group({
     selectC:['',Validators.required],
     })
  
  ngOnInit() {
    
   
  }

  displayGenEthnCalc(){
    var btnarea = document.getElementById('displayCounAreaB')
    var selectarea = document.getElementById("selectCounArea")
    var couninstruction1 = document.getElementById("couninstruction")
    btnarea.setAttribute('style','display:none')
    selectarea.setAttribute('style','display:block')
    couninstruction1.setAttribute('style','display:block')
    
    this.recom.getRecomCounsellor()
    
  }
  
  displayHistoryCalc(){
    var btnarea = document.getElementById('displayCounAreaB')
    var selectarea = document.getElementById("selectCounArea")
    var couninstruction1 = document.getElementById("couninstruction")
    btnarea.setAttribute('style','display:none')
    selectarea.setAttribute('style','display:block')
    couninstruction1.setAttribute('style','display:block')
    this.recom.getHistoryBookingCoun()
  }

  submitCounsellor(){
    var valopt = this.counsellorSelectForm.value.selectC;

    firebase.firestore().collection('Counsellor').get().then(snapshot=>{
      snapshot.docs.forEach(doc=>{
        if(doc.get('name')===valopt){
          var cnname = doc.data().name;
          var cnemail = doc.data().email;
          var cngender = doc.data().gender;
          var cnethnc = doc.data().ethnicity;
          this.storeToFB(cnname,cnemail,cngender,cnethnc)
        }
      })
    })
    

    this.ngzone.run(()=>{
      this.router.navigate(['/select-datetime']);})
 }

 
  
  ChooseCounsellor1(){
    

    
    var Cname = document.getElementById('suggestedName').innerHTML
    var Cemail = document.getElementById('suggestedEmail').innerHTML
    var Cgender = document.getElementById('suggestedGender').innerHTML
    var Cethnicity = document.getElementById('suggestedEthnicity').innerHTML

    this.storeToFB(Cname,Cemail,Cgender,Cethnicity);

    

    this.ngzone.run(()=>{
      this.router.navigate(['/select-datetime']);})

  }

  ChooseCounsellor2(){
    var Cname = document.getElementById('suggestedName2').innerHTML
    var Cemail = document.getElementById('suggestedEmail2').innerHTML
    var Cgender = document.getElementById('suggestedGender2').innerHTML
    var Cethnicity = document.getElementById('suggestedEthnicity2').innerHTML
    

    this.storeToFB(Cname,Cemail,Cgender,Cethnicity);

    


    this.ngzone.run(()=>{
      this.router.navigate(['/select-datetime']);})

  }

ChooseCounsellor3(){
     var Cname = document.getElementById('suggestedName3').innerHTML
    var Cemail = document.getElementById('suggestedEmail3').innerHTML
    var Cgender = document.getElementById('suggestedGender3').innerHTML
    var Cethnicity = document.getElementById('suggestedEthnicity3').innerHTML
    
    this.storeToFB(Cname,Cemail,Cgender,Cethnicity);

    

    this.ngzone.run(()=>{
      this.router.navigate(['/select-datetime']);})

  }

  ChooseCounsellor4(){
    var Cname = document.getElementById('suggestedName4').innerHTML
    var Cemail = document.getElementById('suggestedEmail4').innerHTML
    var Cgender = document.getElementById('suggestedGender4').innerHTML
    var Cethnicity = document.getElementById('suggestedEthnicity4').innerHTML
    
   
    this.storeToFB(Cname,Cemail,Cgender,Cethnicity);

    
    this.ngzone.run(()=>{
      this.router.navigate(['/select-datetime']);})

  }

  ChooseCounsellor5(){
    var Cname = document.getElementById('suggestedName5').innerHTML
    var Cemail = document.getElementById('suggestedEmail5').innerHTML
    var Cgender = document.getElementById('suggestedGender5').innerHTML
    var Cethnicity = document.getElementById('suggestedEthnicity5').innerHTML
    
    this.storeToFB(Cname,Cemail,Cgender,Cethnicity);

    

    this.ngzone.run(()=>{
      this.router.navigate(['/select-datetime']);})

  }

  GotoHome(){
    this.router.navigate(['/home'])
  }

 
  storeToFB(name,email,gender,ethn){

    var historyList = []
    firebase.firestore().collection('history').get().then(historysnapshot=>{
      historysnapshot.docs.forEach(historydoc=>{
        historyList.push(historydoc.data())
      })

      if(historyList.length>=1){
        var i=historyList.length+1
        firebase.firestore().collection('history').doc(i.toString()).set({
          bookedcounsellorName:name,
          bookedcounsellorEmail:email,
          bookedcounsellorGender:gender,
          bookedcounsellorEthn:ethn
        },{merge:true})
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
              
    //           var i = record.length;
    //           this.afs.collection('User').doc(uid).collection('record').doc(i.toString()).set({
    //             cname:name,
    //             cemail:email,
    //             cgender:gender,
    //             cethn:ethn,
    //             sdate:" ",
    //             stime:" ",
    //             smethod:" "
    //           },{merge:true})
              
    //         }//end if2
    
    //         else {
    //           firebase.firestore().collection('User').doc(uid).collection('record').doc('0').set({
    //             cname:name,
    //             cemail:email,
    //             cgender:gender,
    //             cethn:ethn,
    //             sdate:" ",
    //             stime:" ",
    //             smethod:" "
    //           },{merge:true})
              
    //         }

            
    //       })//endsnapshot
    
              
      
      
      
    // }
        
        
      
    
    // })
    
    
    }//end function
  
 

      
      

    
    
  
}
