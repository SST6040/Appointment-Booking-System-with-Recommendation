import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-coun-home',
  templateUrl: './coun-home.page.html',
  styleUrls: ['./coun-home.page.scss'],
})

export class CounHomePage implements OnInit {

  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  LogoutUser(){
    this.authService.logout();
  }
  GotoCounProfile(){
    this.router.navigate(['/coun-profile'])
  }

  GotoAppt(){
    this.router.navigate(['/appointment'])
  }
}


