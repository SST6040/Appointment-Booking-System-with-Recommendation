import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { AlertController, IonButton } from '@ionic/angular';
import { LoginPageRoutingModule } from '../login/login-routing.module';
import { doc, DocumentReference, DocumentSnapshot, getDoc } from "firebase/firestore";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable, Subject } from 'rxjs';
import { SelectCounsellorPage } from '../select-counsellor/select-counsellor.page';
import { Button } from 'selenium-webdriver';










@Injectable({
  providedIn: 'root'
})
export class RecomService {

  selectedIssue;
  
  

  constructor(private afAuth:AngularFireAuth,
    private alertCtrl:AlertController,
    private router:Router,
    private afFirestore:AngularFirestore,
    private ngZone:NgZone
    
    
    
    ) { }

    



//--------not first time booking, get previous record to generate recommendation------------------
getHistoryBookingCoun(){

  firebase.auth().onAuthStateChanged(user=>{
    if(user){

      var previousCoun = [];
      var myFavData = []
      //-------getting login student's booking history with counsellor name--------------------------
      firebase.firestore().collection('history').get().then(snapshot=>{
        snapshot.docs.forEach(doc=>{
          myFavData.push(doc.data())
          if(doc.data().studentuserID===user.uid){
           
            previousCoun.push(doc.data().bookedcounsellorName);
            
          }
        })
         
          var decidedperson={}
          decidedperson = count_duplicate(previousCoun)
          
          var decidedname = (decidedperson[Object.keys(decidedperson)[0]]) 
          //--------the first name get from count_duplicate meaning it is most selected counsellor
 
      
      //-------------count the number of each counsellor appear in the booking history ------------------ 
        function count_duplicate(a){
          let counts = {}
         
          
          for(let i =0; i < a.length; i++){ 
              if (counts[a[i]]){
              counts[a[i]] += 1
              } else {
              counts[a[i]] = 1
              }
             }  

            

             var firstvalue = counts[Object.keys(counts)[0]]
            var highestperson = Object.keys(counts)[0]
   
             for (let prop in counts){
               
              if(counts[prop]>firstvalue){
                firstvalue=counts[prop];
                highestperson = prop;
              }
              
             
                //  if (counts[prop] >= 2){
                //      console.log(prop + " counted: " + counts[prop] + " times.")
                //  }
             }
             return {highestperson,firstvalue}
          
         }//end function
         
        
        
        
        
       
        

        var suggestednamelist=[];


        //--------get all counsellor detail, if counsellor name === decidedname, make it into first one in the list to recommend----------
         firebase.firestore().collection('Counsellor').get().then(bigsnapshot=>{
          
           bigsnapshot.docs.forEach(smalldoc=>{
            if(smalldoc.data().name===decidedname){
              suggestednamelist.unshift(smalldoc.data())
            }
            else{
              suggestednamelist.push(smalldoc.data())
            }
           }
           )//end foreach
           
           submitTOHTML(suggestednamelist)
         })
         
         
         
    

        function submitTOHTML(suggested){
          var displayCArea = document.getElementById('displayCounArea');
          var Cselect = document.getElementById('Cselect')
  
  
          for(let i=0;i<suggested.length;i++){
            var headelecard = document.createElement('ion-card')
            headelecard.setAttribute('id','disCcard'+i)
            headelecard.setAttribute('width','flex')
    
            var cnameitem = document.createElement('ion-item')
            cnameitem.setAttribute('id','disCname'+i)
            
    
            var sugCBadge = document.createElement('ion-badge')
            sugCBadge.setAttribute('slot','end')
            sugCBadge.setAttribute('color','success')
            
  
            var cemailitem = document.createElement('ion-item')
            cemailitem.setAttribute('id','disCemail'+i)
    
            var cgenitem = document.createElement('ion-item')
            cgenitem.setAttribute('id','disCgen'+i)
    
            var cethnitem = document.createElement('ion-item')
            cethnitem.setAttribute('id','disCethn'+i)
  
            var selCbuttonItem = document.createElement('ion-item');
            selCbuttonItem.setAttribute('id','itemofSelCbutton'+i)
          
            var selCrdbGroup = document.createElement('ion-radio-group')
            var selcCrdb = document.createElement('ion-radio')
            selcCrdb.setAttribute('name','same')
            selCrdbGroup.setAttribute('slot','end')
  
            
  
            var Cselectopt = document.createElement('ion-select-option');
            Cselectopt.setAttribute('id','disSelectOpt'+i)
  
            cnameitem.setAttribute('id','disCname'+i)
  
            var selCbutton = document.createElement('ion-button')
           
            selCbutton.setAttribute('id',"selectC"+i);
            selCbutton.setAttribute('slot','end')
            selCbutton.setAttribute('expand','block') 
            selCbutton.setAttribute('fill','outline')
            selCbutton.setAttribute('shape','round');
  
    
            cnameitem.innerText = suggested[i].name;
            cemailitem.innerText = suggested[i].email;
            cgenitem.innerText = suggested[i].gender;
            cethnitem.innerText = suggested[i].ethnicity;
            selCbutton.innerText= 'SELECT';
            sugCBadge.innerText = 'SUGGESTED'
            Cselectopt.innerText = suggested[i].name
           
  
           
            displayCArea.append(headelecard);
            headelecard.append(cnameitem)
            headelecard.append(cemailitem)
            headelecard.append(cgenitem)
            headelecard.append(cethnitem)
            // headelecard.append(selCbuttonItem)
            // selCbuttonItem.append(selCbutton)
  
            Cselect.append(Cselectopt)
           
           
            if(cnameitem.id === 'disCname0'){
              cnameitem.append(sugCBadge)
            } 
  
    }//end forloop


            }//end function


          
  
 
})//snapshot
}
  })
}


 


//------------------for first-time user in selecting counsellor-------------------

getRecomCounsellor(){
  
 

  //-----------------get CounsellorList-------------------------
  var counsellorList=[];
  counsellorList = this.GetCoun()
 
  
  this.afAuth.onAuthStateChanged(user=>{
    if(user){
      firebase.firestore().collection('User').doc(user.uid).get().then(doc=>{
       var usergender = doc.data().gender;
       var userEthn = doc.data().ethnicity;
      Compare(usergender,userEthn);

      })
      }
      })

      function Compare(usergender,ethnicity){
        
        for(let i=0;i<counsellorList.length;i++){
          if(counsellorList[i].gender == usergender && counsellorList[i].ethnicity == ethnicity){

            counsellorList[i].mark = 2;

            
          }

          else if(counsellorList[i].gender != usergender && counsellorList[i].ethnicity == ethnicity){
            counsellorList[i].mark = 1;
          }

          else if(counsellorList[i].gender == usergender && counsellorList[i].ethnicity != ethnicity){
            counsellorList[i].mark = 1;
          }

          else{
            counsellorList[i].mark =0;
          }
        }
                 
          
//----------arrange the name show in UI------------------------------
          var highest = 2;
          var lowest = 0;
          var moderate = 1;

          var suggestedCounsellor = []; 
          for(let i=0;i<counsellorList.length;i++){
              if(counsellorList[i].mark>lowest){

               if(counsellorList[i].mark>moderate){
                suggestedCounsellor.unshift(counsellorList[i])
               }
               
               else{
                 suggestedCounsellor.push(counsellorList[i])
               }
              
              }
              else{
                suggestedCounsellor.push(counsellorList[i])
              }
    
              
              }
            
              //------sort by ascending order------------------
              function compare(a,b){
                if(a.mark < b.mark){
                  return 1;
                }

                if(a.mark > b.mark){
                  return -1
                }

                return 0;
              }
            
             var  maxvalue = Math.max.apply(Math, counsellorList.map(function(o) { return o.mark; }))
             
            counsellorList.sort(compare)
            

           


        SubmitValuetoHtml(counsellorList,maxvalue)
        
      
          }//endfx
    
         
//---------------------------------------------------------
       


      function SubmitValuetoHtml(suggested,max){
        var displayCArea = document.getElementById('displayCounArea');
        var Cselect = document.getElementById('Cselect')

        

        for(let i=0;i<suggested.length;i++){
          var headelecard = document.createElement('ion-card')
          headelecard.setAttribute('id','disCcard'+i)
  
          var cnameitem = document.createElement('ion-item')
          cnameitem.setAttribute('id','disCname'+i)
  
          var sugCBadge = document.createElement('ion-badge')
          sugCBadge.setAttribute('slot','end')
          sugCBadge.setAttribute('color','success')
          

          var cemailitem = document.createElement('ion-item')
          cemailitem.setAttribute('id','disCemail'+i)
  
          var cgenitem = document.createElement('ion-item')
          cgenitem.setAttribute('id','disCgen'+i)
  
          var cethnitem = document.createElement('ion-item')
          cethnitem.setAttribute('id','disCethn'+i)

          var selCbuttonItem = document.createElement('ion-item');
          selCbuttonItem.setAttribute('id','itemofSelCbutton'+i)
        
          var selCrdbGroup = document.createElement('ion-radio-group')
          var selcCrdb = document.createElement('ion-radio')
          selcCrdb.setAttribute('name','same')
          selCrdbGroup.setAttribute('slot','end')

          

          var Cselectopt = document.createElement('ion-select-option');
          Cselectopt.setAttribute('id','disSelectOpt'+i)

          cnameitem.setAttribute('id','disCname'+i)

          var selCbutton = document.createElement('ion-button')
         
          selCbutton.setAttribute('id',"selectC"+i);
          selCbutton.setAttribute('slot','end')
          selCbutton.setAttribute('expand','block') 
          selCbutton.setAttribute('fill','outline')
          selCbutton.setAttribute('shape','round');

  
          cnameitem.innerText = suggested[i].name;
          cemailitem.innerText = suggested[i].email;
          cgenitem.innerText = suggested[i].gender;
          cethnitem.innerText = suggested[i].ethnicity;
          selCbutton.innerText= 'SELECT';
          sugCBadge.innerText = 'SUGGESTED'
          Cselectopt.innerText = suggested[i].name
         

         
          displayCArea.append(headelecard);
          headelecard.append(cnameitem)
          headelecard.append(cemailitem)
          headelecard.append(cgenitem)
          headelecard.append(cethnitem)
          // headelecard.append(selCbuttonItem)
          // selCbuttonItem.append(selCbutton)

          Cselect.append(Cselectopt)
         
        
         //-------------if mark equal to max value, create sugested badge------------------

          if(suggested[i].mark === max){
            cnameitem.append(sugCBadge)
          }
             
          
          

  }//end for
 
          
          }//end loop
          

          
 

  
     
}

  



  


  
               
     
CalcCounGender(a:any[]){
const dbRef = firebase.firestore().collection('Counsellor');
var gender=new Array();
gender = a;

dbRef.onSnapshot(
   (snapshot)=>{  
     const counsellor = snapshot.docs.map((doc)=>({
       id:doc.id,
       alldata:doc.data(),
       point:new Number()
            
      })
        )

       function pushGender(b:any[]){
        
        var coungender=new Array();
        coungender=b;

       for(let i =0;i<counsellor.length;i++){
            coungender[i] = Object.getOwnPropertyDescriptor(counsellor[i].alldata,'gender').value;
          } //forloop end
          return coungender;
        
       }//pushgender fx end
      
      pushGender(gender)
       })
        
      
        
}  
       
  

GetCoun(){
    const dbRef = firebase.firestore().collection('Counsellor');
    var counsellor = []
    dbRef.get().then(snapshot=>{
          
      snapshot.forEach(doc=>{
        var myData = doc.data();
         counsellor.push(myData);
         point:new Number(0)
      })
    })

  return counsellor; 
        
}  

GetAllBooking(){

  var bookinglist={};
  firebase.firestore().collection('history').where('status','==','success').get().then(allbooking=>{
    allbooking.docs.forEach(booking=>{
      bookinglist={
        bcname:booking.data().bookedcounsellorName,
        bcemail:booking.data().bookedcounsellorEmail,
        bcgender:booking.data().bookedcounsellorGender,
        bcethn:booking.data().bookedcounsellorEthn,
        bapptime:booking.data().appointmentTime,
        bappdate:booking.data().appointmentDate,
        bappmethod:booking.data().appointmentMethod,
        bappissue:booking.data().appointmentIssue
        }
    })
  })

  return bookinglist;
}



// //-------------checking availability---------------------
// CalcAvailability(){
//   var seeallbooking = this.GetAllBooking()
  
//   var bookinglist=[];
//   var currentbooking ={};


//   //----------------get current booking detail --------------------
//   firebase.firestore().collection('history').get().then(allbooking=>{
//     allbooking.docs.forEach(booking=>{
//       bookinglist.push(booking.data())
//     })

//     if(bookinglist.length>=0)
//     var i = bookinglist.length;
//     firebase.firestore().collection('history').doc(i.toString()).get().then(async  curbook=>{
//      currentbooking = {
//        cname:curbook.data().bookedcounsellorName,
//        cemail:curbook.data().bookedcounsellorEmail,
//        cgender:curbook.data().bookedcounsellorGender,
//        cethn:curbook.data().bookedcounsellorEthn,
//        apptime:curbook.data().appointmentTime,
//        appdate:curbook.data().appointmentDate,
//        appmethod:curbook.data().appointmentMethod,
//        appissue:curbook.data().appointmentIssue,
//      }
    
     
// //-------------if any of the booking history counsellor and time and date is the same, create alert to notify user
//      for(let i=0;i<Object.keys(bookinglist).length;i++){
//       if( (seeallbooking[i].bookedcounsellorEmail === currentbooking['cemail']) && (seeallbooking[i].appointmentTime === currentbooking['apptime']) && (seeallbooking[i].appointmentDate === currentbooking['appdate']) ){
        
        
//           const alert = await this.alertCtrl.create({
            
//             header: 'Booking is taken!',
//             subHeader: 'The booking time you selected is taken.',
//             message: 'Please select again a new date and time. Thank you',
//             buttons: ['OK']
//           });
      
//           await alert.present();
      
//           const { role } = await alert.onDidDismiss();
//           console.log('onDidDismiss resolved with role', role);
//         }

//       }
//     }



//     )

    
    
//   })//END SNAPSHOt

  

 

  
// }

// DisplayDate(){
//   var dateToday = new Date().toDateString().substring(4)

//   var datepicker = document.getElementById('date')
//   datepicker.setAttribute('min',dateToday)


 
//   // dateToday[2] + '-' + dateToday[0] + '-' + dateToday[1]

  
// }


GetSession(){
 
  this.afAuth.onAuthStateChanged(user=>{
    if(user){

      firebase.firestore().collection('history').where('studentuserID','==',user.uid).get().then(snap=>{
        var previousTime=[]
        snap.docs.forEach(doc=>{

          previousTime.push(doc.data().appointmentTime);
        })//end doc       
   
        var suggestedTime =  this.count_duplicateTime(previousTime)
        
        

         submitToTimeHTML(suggestedTime[0][0])

         function submitToTimeHTML(recomtime){

            var selCbutton = document.getElementById('suggestT')
            selCbutton.innerText = recomtime
            
            var sugtime = document.getElementById('suggestedtimerow')
            sugtime.setAttribute('style','display:block')

         }
         })//endsnapshot
         

          
    }
  })
}


count_duplicateTime(a){
    let counts = {}
   
    for(let i =0; i < a.length; i++){ 
        if (counts[a[i]]){
        counts[a[i]] += 1
        } else {
        counts[a[i]] = 1
        }
       }  

      
       var firstvalue = counts[Object.keys(counts)[0]]
      var highesttime = Object.keys(counts)[0]

       for (let prop in counts){

        if(counts[prop]>firstvalue){
          
          firstvalue=counts[prop];
          highesttime = prop;
         
        }

       
          //  if (counts[prop] >= 2){
          //      console.log(prop + " counted: " + counts[prop] + " times.")
          //  }
       }

       var sortable = [];
        for (var vehicle in counts) {
            sortable.push([vehicle, counts[vehicle]]);
        }
       
        sortable.sort(function(a, b) {
          return b[1] - a[1];
      });
      
      return(sortable)
 
   }//end function 


  GetMethod(){
    this.afAuth.onAuthStateChanged(user=>{
      if(user){

      
            // firebase.firestore().collection('history').where('studentuserID','==',user.uid).get().then(snap=>{
            //   var previousMethod=[]
            //   snap.docs.forEach(doc=>{
      
            //     previousMethod.push(doc.data().appointmentMethod);
            //   })//end doc       
         
              
            //   var suggestedMethod =  this.count_duplicateTime(previousMethod)
            //   console.log(suggestedMethod)

            //    submitToMethodHTML(suggestedMethod)
      
            //    function submitToMethodHTML(recommethod){
      
              
                
            //     var sugBadge = document.createElement('ion-badge')
            //     sugBadge.innerText = 'SUGGESTED'
            //     sugBadge.setAttribute('color','success')  
            //     sugBadge.setAttribute('slot','end')

            //     var sugopt0 = document.getElementById('suggested')
                

            //     console.log(recommethod)
            //     sugopt0.innerText = recommethod
            //     sugopt0.append(sugBadge)
                              
               
            //    }//end function
            //   })//end snapshot
      
                

        firebase.firestore().collection('history').where('studentuserID','!=',user.uid).get().then(()=>{
          firebase.firestore().collection('User').doc(user.uid).get().then(doc=>{
                var prefMethod = doc.data().method;
          
                var suggestedLBL = document.createElement('ion-badge')
                suggestedLBL.innerText='SUGGESTED'
                suggestedLBL.setAttribute('color','success')
                suggestedLBL.setAttribute('slot','end')


                  if (prefMethod  === 'video-call'){
                    
                    var suggested = document.getElementById('suggested')
                    suggested.innerText=prefMethod
                    suggested.insertAdjacentElement('beforeend',suggestedLBL)



                    document.getElementById('11').innerText='voice-call'

                    document.getElementById('12').innerText='text-message'
                    
                  }
          
                  else if (prefMethod  === 'voice-call'){
                  
                    var suggested = document.getElementById('suggested')
                    suggested.innerText=prefMethod
                    suggested.insertAdjacentElement('beforeend',suggestedLBL)

                    
                    document.getElementById('11').innerText='video-call'

                    document.getElementById('12').innerText='text-message'
                  }

                  else if (prefMethod  === 'text-message'){
                  
                    var suggested = document.getElementById('suggested')
                    suggested.innerText=prefMethod
                    suggested.insertAdjacentElement('beforeend',suggestedLBL)

                    
                    document.getElementById('11').innerText='video-call'

                    document.getElementById('12').innerText='voice-call'
                  }

                  

                })
              })
              }
          
            })
          
            }

  
  GetIssue(){
    this.afAuth.onAuthStateChanged(user=>{
      if(user){
        firebase.firestore().collection('User').doc(user.uid).get().then(doc=>{
         var userdepression = doc.data().isDepressed;
  
         
          if (userdepression === 'depression'){
           
            var suggestedlabel = document.createElement('ion-badge')
            suggestedlabel.innerText = 'SUGGESTED';
            suggestedlabel.setAttribute ('slot','end')
            suggestedlabel.setAttribute('color','success')
            

           var suggestedIssue = document.getElementById('10issue');
          //  suggestedIssue.setAttribute('color','success');
           
           suggestedIssue.append(suggestedlabel)
           

        }
          
        })
      }
  
    })
  
    }
  
    

  
 

      
      
 







   




  
  }


