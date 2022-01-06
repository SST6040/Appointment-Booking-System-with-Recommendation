import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRecordService } from '../services/create-record.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private crt:CreateRecordService,
    private ngzone:NgZone,
    private router:Router) { }

  ngOnInit() {
    this.crt.DisplayProfile()
  }

  
editname(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editname']);})
}
  
editethn(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editethn']);})
}

editgender(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editgender']);})
}

editmethod(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editmethod']);})
}

editemail(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editemail']);})
}
  
editphone(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editphone']);})
}

editsession(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editsession']);})
}

editstudid(){
  this.ngzone.run(()=>{
    this.router.navigate(['/editstudid']);})
}

GotoHome(){
  this.router.navigate(['/home'])
}


}
