import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder,FormControl, Validators,FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { alertController } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-coun',
  templateUrl: './register-coun.page.html',
  styleUrls: ['./register-coun.page.scss'],
})
export class RegisterCounPage implements OnInit {

  constructor(public formB:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private ngzone:NgZone,
    private afFirestore:AngularFirestore) { }

    counForm = this.formB.group({
    name:['',Validators.required],
    email:['',Validators.required],
    gender:[['Female','Male'],Validators.required],
    staffID:['',Validators.required],
    password:['',Validators.required],
    phone:['',Validators.required],
    ethnicity:['',Validators.required],
    


      
  })

  ngOnInit() {
  }

  createCounsellor(){
    this.authService.registerCounsellor(
      this.counForm.value.email,
      this.counForm.value.password,
      this.counForm.value.name,
      this.counForm.value.phone,
      this.counForm.value.gender,
      this.counForm.value.staffID,
      this.counForm.value.ethnicity,
      )
    
    .then(()=>{
      this.counForm.reset(),
        this.ngzone.run(()=>{
        this.router.navigate(['/login']);})
        })

}

}





 

  

