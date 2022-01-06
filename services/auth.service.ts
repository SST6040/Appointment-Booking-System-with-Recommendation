import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginPageRoutingModule } from '../login/login-routing.module';


 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isCoun; 

  constructor( public afAuth:AngularFireAuth,
    private alertCtrl:AlertController,
    private router:Router,
    private afFirestore:AngularFirestore,
    
  ) { }

  

  loginUser(
    email:string,
    password:string
  ):Promise<firebase.auth.UserCredential>{
    return new Promise<firebase.auth.UserCredential>((resolve,reject)=>{
      this.afAuth.signInWithEmailAndPassword(email,password)
      .then(
        res => resolve (res),
        
      )
      .catch(async error=>{
          const alert =await this.alertCtrl.create({
            cssClass:'ionalert',
            header:'Alert',
            message:error.message,
            buttons:['OK']
          });

          await alert.present();
          
          const { role} = await alert.onDidDismiss();
          
        })

      
    })
  }

 loginCounUser(
    pemail:string,
    password:string
  ){
    
    return new Promise<firebase.auth.UserCredential>((resolve,reject)=>{
      this.afAuth.signInWithEmailAndPassword(pemail,password)
      .then( res=>
        // res => resolve(res)
        firebase.auth().onAuthStateChanged(user=>{
          if(user){
            var counsellor = [];
            firebase.firestore().collection('Counsellor').get().then(snapshot=>{
              snapshot.docs.forEach(doc=>
                counsellor.push(doc.data().email))
              for(let i =0;i<counsellor.length;i++){
                if(user.email===counsellor[i]){
                  resolve(res)
                }
              }

            })
          }
        })
      )//end this
      
      
      .catch(async error=>{
          const alert =await this.alertCtrl.create({
            cssClass:'ionalert',
            header:'Alert',
            message:error.message,
            buttons:['OK']
          });

          await alert.present();
          
          const { role} = await alert.onDidDismiss();
          
        })

      
    })
  }


  registerUser(
    email:string,
    password:string,
    name:string,
    phone:number,
    gender:string,
    studID:string,
    ethnicity:string,
    preflang:string,
    method:string,
    session:string
  ){
    
    
    return new Promise<firebase.auth.UserCredential>((resolve,reject)=>{
      this.afAuth.createUserWithEmailAndPassword(email,password)
      .then( 
        res => resolve(res)
        )
      .then(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
          if(user){
            const uid = user.uid;
            this.afFirestore.collection('User').doc(uid)
              .set({
              name:name,
              email: email,
              phone: phone,
              gender: gender,
              studID: studID,
              ethnicity:ethnicity,
              preflang:preflang,
              method:method,
              session:session})
          }
        })
        })
        .catch(async error=>{
          const alert =await this.alertCtrl.create({
            cssClass:'ionalert',
            header:'Alert',
            message:error.message,
            buttons:['OK']
          });
  
          await alert.present();
          
          const { role} = await alert.onDidDismiss();
          console.log('ondiddismiss ersolved with role',role)
        })
      })
      
    }
        

     
        


  registerCounsellor(
    email:string,
    password:string,
    name:string,
    phone:number,
    gender:string,
    staffID:string,
    ethnicity:string,
    
  ){
    
    
    return new Promise<firebase.auth.UserCredential>((resolve,reject)=>{
      this.afAuth.createUserWithEmailAndPassword(email,password)
      .then( 
        res => resolve(res),
        err => reject(err))
        })
      .then(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
          if(user){
            const uid = user.uid;
            this.afFirestore.collection('Counsellor').doc(uid).set({
             
              name:name,
              email: email,
              phone: phone,
              gender: gender,
              staffID: staffID,
              ethnicity:ethnicity,
            })
            
              
              
          }})
        })
        // .catch(async error=>{
        //   const alert =await this.alertCtrl.create({
        //     cssClass:'ionalert',
        //     header:'Alert',
        //     message:error.message,
        //     buttons:['OK']
        //   });

        //   await alert.present();
          
        //   const { role} = await alert.onDidDismiss();
        //   console.log('ondiddismiss ersolved with role',role)
        // })

     
        
  }
   

  logout(){
    
    return this.afAuth.signOut()
    .then(()=>{
      this.router.navigate(['/login'])
    })
  }
  }

  



  
    
  


  
  

