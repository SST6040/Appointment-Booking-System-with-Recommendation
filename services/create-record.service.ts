import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { doc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class CreateRecordService {



  constructor(private afs:AngularFirestore,
    ) { }

  
  DisplayProfile(){

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        const uid = user.uid;

          const dbRef = firebase.firestore().collection('User').doc(uid);
          
          dbRef.get().then(doc=>{
            document.getElementById('uname').innerText = doc.data().name;
            document.getElementById('ustudid').innerText = doc.data().studID;
            document.getElementById('ugender').innerText = doc.data().gender;
            document.getElementById('uethn').innerText =  doc.data().ethnicity;
            document.getElementById('umethod').innerText = doc.data().method;
            document.getElementById('usession').innerText =  doc.data().session;
            document.getElementById('uphone').innerText =  doc.data().phone;
            document.getElementById('utestmark').innerText =  doc.data().testmark + ' ('+doc.data().isDepressed+')';
            document.getElementById('uemail').innerText =  doc.data().email;
              })
            }
          })
        }
               
    
DisplayCounProfile(){

          firebase.auth().onAuthStateChanged((user)=>{
            if(user){
              const uid = user.uid;
      
               const dbRef = firebase.firestore().collection('Counsellor').doc(uid);
                
                dbRef.get().then(doc=>{
                  
                  document.getElementById('cnname').innerText = doc.data().name;
                  document.getElementById('cnemail').innerText = doc.data().email;
                  document.getElementById('cnstaffid').innerText = doc.data().staffID;
                  document.getElementById('cngender').innerText = doc.data().gender;
                  document.getElementById('cnethn').innerText =  doc.data().ethnicity;
                 
                 
      
                    })
                  }
                })
              }
                     
  
                     
          
  //--------- in confirm booking display all current booking details---------------------
DisplayIssue(){

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      const uid = user.uid;
    
      const dbRef = firebase.firestore().collection('history')

      var record = []

       dbRef.get().then(snapshot=>{
                
        snapshot.forEach(doc=>{
          var myData = doc.data();
           record.push(myData)

        })

        if(record.length>0){
          var i = record.length ;

            dbRef.doc(i.toString()).get().then(snapshot=>{

           

            document.getElementById('disissue').innerText = snapshot.data().appointmentIssue;
            document.getElementById('cname').innerText = snapshot.data().bookedcounsellorName;
            document.getElementById('cgender').innerText = snapshot.data().bookedcounsellorGender;
            document.getElementById('cethn').innerText = snapshot.data().bookedcounsellorEthn;
            document.getElementById('cemail').innerText = snapshot.data().bookedcounsellorEmail;
            document.getElementById('disdate').innerText = snapshot.data().appointmentDate;
            document.getElementById('distime').innerText = snapshot.data().appointmentTime;
            document.getElementById('dismethod').innerText = snapshot.data().appointmentMethod;


            })
     
       
          }
      })//end snapshot

      
      
    
    
    }
  })
}

DisplayHistory(){
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      const uid = user.uid;
    
      const dbRef = firebase.firestore().collection('history');

      var record = []

       dbRef.get().then(snapshot=>{
                
        snapshot.forEach(doc=>{
          if(doc.data().studentuserID===user.uid){
            var myData = doc.data();
              if (myData.status==='success'){
              record.push(myData)
          }
          }
          
        })//end foreach


        for(let i=0;i<record.length;i++){
       
        var headelecard = document.createElement('ion-card')
        headelecard.setAttribute('id',(record.length).toString())

        var cnameitem = document.createElement('ion-item')
        cnameitem.setAttribute('id',i+'discname')

        var cemailitem = document.createElement('ion-item')
        cemailitem.setAttribute('id',i+'discemail')

        var cgenitem = document.createElement('ion-item')
        cgenitem.setAttribute('id',i+'discgen')

        var cethnitem = document.createElement('ion-item')
        cethnitem.setAttribute('id',i+'discethn')
        
        var seltitem = document.createElement('ion-item')
        seltitem.setAttribute('id',i+'disselt')

        var selditem = document.createElement('ion-item')
        selditem.setAttribute('id',i+'disseld')

        var selmitem = document.createElement('ion-item')
        selmitem.setAttribute('id',i+'disselm')

        var selissitem = document.createElement('ion-item')
        selissitem.setAttribute('id',i+'disseliss')

        var recordHeader = document.createElement('ion-item')
        selissitem.setAttribute('id',i+'disrechead')

        var recordID = document.createElement('ion-badge')
       
        recordID.setAttribute('slot','start')
        

        cnameitem.innerText = 'Name of Counsellor: ' + record[i].bookedcounsellorName;
        cemailitem.innerText = 'Email of Counsellor : ' + record[i].bookedcounsellorEmail;
        cgenitem.innerText = 'Gender of Counsellor : ' + record[i].bookedcounsellorGender;
        cethnitem.innerText = 'Ethnicity of Counsellor : ' + record[i].bookedcounsellorEthn;
        seltitem.innerText = 'Appointment Time: ' + record[i].appointmentTime;
        selditem.innerText = 'Appointment Date: ' + record[i].appointmentDate;
        selissitem.innerText = 'Issue seeking for consultation: '+ record[i].appointmentIssue;
        selmitem.innerText = 'Counselling method: '+record[i].appointmentMethod;
        recordID.innerText = 'Record ID: '+record[i].recordID;
        
        var HdisplayArea = document.getElementById('displayH');
   
        HdisplayArea.append(headelecard);
        headelecard.append(recordHeader)
        recordHeader.append(recordID)
        headelecard.append(selditem)
        headelecard.append(seltitem)
        headelecard.append(cnameitem)
        headelecard.append(cgenitem)
        headelecard.append(cemailitem)
        headelecard.append(cethnitem)
        headelecard.append(selmitem)
        headelecard.append(selissitem)
        


        
        }//end loop

})
    }

  })
}
DisplayCnHistoryNew(){
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){

      var recordlist = []
      firebase.firestore().collection('history').where('status','==','success').get().then(hislist=>{
        hislist.docs.forEach(history=>{
          if(user.email===history.data().bookedcounsellorEmail){
           var  myData = history.data()
            
            recordlist.push(myData)
          }
        })//end doc



        for(let i=0;i<recordlist.length;i++){
          firebase.firestore().collection('User').doc(recordlist[i].studentuserID).get().then(doc=>{
            var headelecard = document.createElement('ion-card')
                  
                  var snameitem = document.createElement('ion-item')
                  
                  var semailitem = document.createElement('ion-item')
                
                  var sgenitem = document.createElement('ion-item')
                 
                  var sethnitem = document.createElement('ion-item')
                
                  var steltitem = document.createElement('ion-item')
                
                  var stelditem = document.createElement('ion-item')
                 
                  var stelmitem = document.createElement('ion-item')
                 
                  var stelissitem = document.createElement('ion-item')
              
                  var sphoneitem = document.createElement('ion-item')
                
                  var headerofbookrecordID = document.createElement('ion-item')
                  var bookrecordID = document.createElement('ion-badge')
                
                  bookrecordID.setAttribute('slot','start')
                  


                  
                  snameitem.innerText = 'Student Name: '+doc.data().name;
                  semailitem.innerText = 'Student Email: '+doc.data().email;
                  sgenitem.innerText = 'Student Gender: '+doc.data().gender;
                  sethnitem.innerText = 'Student Ethnicity: '+doc.data().ethnicity;
                  sphoneitem.innerText = 'Student Phone: '+doc.data().phone;
                  steltitem.innerText = 'Appointment Time: '+recordlist[i].appointmentTime
                  stelditem.innerText = 'Appointment Date: '+recordlist[i].appointmentDate
                  stelissitem.innerText = 'Issue of Student Seeking for Counselling: '+recordlist[i].appointmentIssue
                  stelmitem.innerText = 'Counselling Method: '+recordlist[i].appointmentMethod
                  bookrecordID.innerText = 'Appointment ID: '+recordlist[i].recordID;
                  

                  var BookingdisplayArea = document.getElementById('displaybookedstud');
                  
                
                  BookingdisplayArea.append(headelecard);
                  headelecard.append(headerofbookrecordID)
                  headerofbookrecordID.append(bookrecordID)
                  headelecard.append( snameitem)
                  headelecard.append(semailitem)
                  headelecard.append(sgenitem)
                  headelecard.append(sethnitem)
                  headelecard.append(sphoneitem)
                  headelecard.append(sphoneitem)
                  headelecard.append(steltitem)
                  headelecard.append( stelditem)
                  headelecard.append(stelissitem)
                  headelecard.append(stelmitem)

          })

        }


      })
    }
  })
}

DisplayCnHistory(){
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){


      const dbRef = firebase.firestore().collection('User');
      dbRef.get().then((snapshot)=>{
        snapshot.docs.forEach(userdoc=>{ //all userin the database
          firebase.firestore().collection('User').doc(userdoc.id).collection('record').get().then( //get all user in database that have record
            recorddocs=>{
              
              recorddocs.docs.forEach(recdoc=>{
                
                if(recdoc.data().cemail === 'Email: '+user.email){
                firebase.firestore().collection('User').doc(recdoc.data().studentuid).get().then(doc=>{
                  var studdata = doc.data()

                  var headelecard = document.createElement('ion-card')
                  
                  var snameitem = document.createElement('ion-item')
                  
                  var semailitem = document.createElement('ion-item')
                
                  var sgenitem = document.createElement('ion-item')
                 
                  var sethnitem = document.createElement('ion-item')
                
                  var steltitem = document.createElement('ion-item')
                
                  var stelditem = document.createElement('ion-item')
                 
                  var stelmitem = document.createElement('ion-item')
                 
                  var stelissitem = document.createElement('ion-item')
              
                  var sphoneitem = document.createElement('ion-item')
                
                  var headerofbookrecordID = document.createElement('ion-item')
                  var bookrecordID = document.createElement('ion-badge')
                
                  bookrecordID.setAttribute('slot','start')
                  


                  
                  snameitem.innerText = 'Student Name: '+studdata.name;
                  semailitem.innerText = 'Student Email: '+studdata.email;
                  sgenitem.innerText = 'Student Gender: '+studdata.gender;
                  sethnitem.innerText = 'Student Ethnicity: '+studdata.ethnicity;
                  sphoneitem.innerText = 'Student Phone: '+studdata.phone;
                  steltitem.innerText = 'Appointment Time: '+recdoc.data().stime;
                  stelditem.innerText = 'Appointment Date: '+recdoc.data().sdate;
                  stelissitem.innerText = 'Issue of Student Seeking for Counselling: '+recdoc.data().sissue;
                  stelmitem.innerText = 'Counselling Method: '+recdoc.data().smethod;
                  bookrecordID.innerText = 'Appointment ID: '+recdoc.data().recordID;
                  

                  var BookingdisplayArea = document.getElementById('displaybookedstud');
                  
                
                  BookingdisplayArea.append(headelecard);
                  headelecard.append(headerofbookrecordID)
                  headerofbookrecordID.append(bookrecordID)
                  headelecard.append( snameitem)
                  headelecard.append(semailitem)
                  headelecard.append(sgenitem)
                  headelecard.append(sethnitem)
                  headelecard.append(sphoneitem)
                  headelecard.append(sphoneitem)
                  headelecard.append(steltitem)
                  headelecard.append( stelditem)
                  headelecard.append(stelissitem)
                  headelecard.append(stelmitem)
                })

                }
                
                
              })

              
            }
            

            
          )
         
          
          })
                  
})
}
    })
}


          }//last end 
