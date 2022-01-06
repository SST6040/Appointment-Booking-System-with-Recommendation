import { Component, NgZone, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';

//firebase auth
import {AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // validationUserMessage = {
  //   email:
  //   [{type:"required", message:"Please enter your email"},
  //   {type:"pattern", message:"Email is incorrect. Try again"}],

  //   password:[
  //   {type:"required", message:"Please enter your password"},
  //   {type:"minlength", message:"Password must be at least 5 characters or more"}
  //   ]
  // 
  
  // validationFormUser:FormGroup;



  constructor(private formbuilder:FormBuilder, 
    private authService:AuthService, 
    private router:Router,
    private ngzone:NgZone,
    private afFirestore:AngularFirestore ) { }

    userLoginForm = this.formbuilder.group({
      
      email:['',Validators.required],
      password:['',Validators.required]
        
    });
  
  ngOnInit() {

  
}

LoginUser(){
  this.authService.loginUser(
    this.userLoginForm.value.email, 
    this.userLoginForm.value.password)
  
    
    .then((result)=>{
      this.userLoginForm.reset(),
      this.ngzone.run(()=>{
      this.router.navigate(['/home']);})
      })
}

RegisterUser(){
  this.router.navigate(['register']);
  
}

LoginCounsellor(){
  this.authService.loginCounUser(
    this.userLoginForm.value.email, 
    this.userLoginForm.value.password)
  
    
    .then((result)=>{
      this.userLoginForm.reset(),
      this.ngzone.run(()=>{
      this.router.navigate(['/coun-home']);})
      })
}

RegisterCounsellor(){
  this.router.navigate(['register-coun']);
  
}
}
