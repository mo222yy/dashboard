import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service'
import { SkapakundComponent } from '../skapakund/skapakund.component'
import { Router } from '@angular/router';  
import { MatCheckboxModule } from '@angular/material/checkbox'
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-kunder',
  templateUrl: './kunder.component.html',
  styleUrls: ['./kunder.component.scss']
})
export class KunderComponent implements OnInit {
  customers = []

  solsidan = []
  dannes = []
  bong = []

  constructor(private CustomerService: CustomerService,
              private router: Router,
             ) { }

  ngOnInit() {
    this.CustomerService.getCustomers()
    this.CustomerService.setCustomers()
    this.solsidan = this.CustomerService.solsidan
    this.dannes = this.CustomerService.dannes
    this.bong = this.CustomerService.bong

    this.customers = this.CustomerService.customers
  }

  editCustomer(ev) {
    this.CustomerService.editCustomer = ev
    this.router.navigate(['editCustomer'])
  }

  createCustomer() {
    this.router.navigate(['skapakund'])
  }
}
