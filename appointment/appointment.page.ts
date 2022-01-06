import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRecordService } from '../services/create-record.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {



  constructor(private crt:CreateRecordService,
    private ngzone:NgZone,
    private router:Router) { }



  ngOnInit() {
    this.crt.DisplayCnHistoryNew()
  }
  
  GotoHome(){
    this.router.navigate(['/coun-home'])
  }
}
