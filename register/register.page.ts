import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder,FormControl, Validators,FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { alertController } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public formB:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private ngzone:NgZone,
    private afFirestore:AngularFirestore) { }

  userprofileForm = this.formB.group({
    name:['',Validators.required],
    email:['',Validators.required],
    gender:[['Female','Male'],Validators.required],
    studID:['',Validators.required],
    password:['',Validators.required],
    phone:['',Validators.required],
    ethnicity:['',Validators.required],
    preflang:['',Validators.required],
    method:['',Validators.required],
    session:['',Validators.required],


      
  })

  ngOnInit() {
  }

  createUser(){
    this.authService.registerUser(this.userprofileForm.value.email,
      this.userprofileForm.value.password,
      this.userprofileForm.value.name,
      this.userprofileForm.value.phone,
      this.userprofileForm.value.gender,
      this.userprofileForm.value.studID,
      this.userprofileForm.value.ethnicity,
      this.userprofileForm.value.preflang,
      this.userprofileForm.value.method,
      this.userprofileForm.value.session)
    
    .then(()=>{
        this.ngzone.run(()=>{
        this.router.navigate(['/login']);})
        })

}

}