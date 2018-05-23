import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeService } from './time.service'
import { Router } from '@angular/router';  
import { ClockComponent } from './clock/clock.component'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { OrdersService } from './orders.service'
import { UtleveransComponent } from './utleverans/utleverans.component';
import { StatistikComponent } from './statistik/statistik.component';
import { InformationComponent } from './information/information.component';

@Component({
  selector: 'app-root',
  template: '<app-clock></app-clock',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent  implements OnInit {
  
  year: string;
  month: string;
  date: string;

  hours: string;
  minutes: string;
  seconds: string;

  stop: boolean = false;


  constructor(private TimeService: TimeService,
              private router: Router,
              private OrdersService: OrdersService
             ) {}


  ngOnInit(): void {
  this.getDate()
  this.getTime()
}

  play(playStatus) {
   this.TimeService.playSection = playStatus
   let stats;
   let info;
   let recurse;

   if(this.stop === true) {
    this.stop = false
  }

  setTimeout( () => {
    if(this.stop === false) {
      this.router.navigate(['utleverans'])
    }

  }, 0)

 

    stats = setTimeout( () => {
      if(this.stop === false) {
      this.router.navigate(['statistik'])
      }
    }, 5000)
 

    info = setTimeout( () => {
      if(this.stop === false) {
      this.router.navigate(['information'])
      }
    }, 10000)

  
    recurse = setTimeout( () => {
      if(this.stop === false) {
      this.play(playStatus)
      }
    }, 15000)

}

stopFunction () {
  this.stop = true
  this.TimeService.playSection = undefined
  console.log('stopfunc',this.TimeService.playSection)
  this.router.navigate(['utleverans'])

}




  getDate() {
      this.TimeService.getDate()
      this.year = this.TimeService.year
      this.month = this.TimeService.month
      this.date = this.TimeService.date  
  }

  
  getTime() {
    let d = new Date()
    let hours = d.getHours()
    this.hours = this.TimeService.get2digits(hours)

    let minutes = d.getMinutes()
    this.minutes = this.TimeService.get2digits(minutes)

    let seconds = d.getSeconds()
    this.seconds = this.TimeService.get2digits(seconds)
  }
}
