import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class UserGenderService {

  constructor() {  }

CalcUserGender(abc){

   var userID = firebase.auth().currentUser.uid  
   var usergen:any =abc;
  
   function usergender(){
     return firebase.firestore().collection('User').doc(userID).get()
    }


   async function usergendernew(b:any){
     var ugend:any;
     ugend=b;
     await usergender().then((val)=>val.get('gender'))
     .then(
       res => {return res}
      
     )
  }
  usergendernew(usergen);
}




}



