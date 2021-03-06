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

  stop: boolean;

  //Timers
  start;
  stats;
  info;
  recurse;

  constructor(private TimeService: TimeService,
              private router: Router,
              private OrdersService: OrdersService
             ) {}


  ngOnInit(): void {
  this.getDate()
  this.getTime()
  this.redirect()
}

  redirect() {
    this.router.navigate(['utleverans'])

  }

  play(playStatus) {
    this.TimeService.playSection = playStatus
    this.stop = false;
    this.playSlide()
  }
   
  
  playSlide() {
     
    this.start = setTimeout( () => {
        this.router.navigate(['statistik'])
    }, 50)

    this.stats = setTimeout( () => {
      this.router.navigate(['utleverans'])
    }, 10000)
 

    this.info = setTimeout( () => {
      this.router.navigate(['information'])
    }, 30000)

  
    this.recurse = setTimeout( () => {
      this.playSlide()
    }, 40000)

}

stopFunction () {
  this.stop = true
  this.TimeService.playSection = undefined
  this.router.navigate(['utleverans'])
  clearTimeout(this.stats)
  clearTimeout(this.info)
  clearTimeout(this.recurse)

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
