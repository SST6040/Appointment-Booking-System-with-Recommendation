
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRecordService } from '../services/create-record.service';

@Component({
  selector: 'app-coun-profile',
  templateUrl: './coun-profile.page.html',
  styleUrls: ['./coun-profile.page.scss'],
})
export class CounProfilePage implements OnInit {

  constructor(private crt:CreateRecordService,
    private ngzone:NgZone,
    private router:Router) { }

  ngOnInit() {
 this.crt.DisplayCounProfile()
  }

    
editcnname(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editcnname']);})
}
  
editcnethn(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editcnethn']);})
}

editcngender(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editcngender']);})
}


editcnstaffid(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editcnstaffid']);})
}

GotoHome(){
  this.router.navigate(['/coun-home'])
}
}

    

