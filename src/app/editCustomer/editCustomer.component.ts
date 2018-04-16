import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-editCustomer',
  templateUrl: './editCustomer.component.html',
  styleUrls: ['./editCustomer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customers = []
  customerToEdit: number; //index number

  //Skapa kund
  test: string = 'hej'
  customerName: string;
  customerId: string;
  section: string;
  contacts = []


  //for contacts
  firstname: string;
  lastname: string;
  phone: string;
  eMail: string;

  //for cutOffs
  cOsweden: string;
  cOabroad: string;
  cOcomments: string;

  //orders
  openOrders = []
  abroadOrders = []
  restOrders = []
  orderLines = []


  constructor(private customerService: CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.customerService.getCustomers() // hämta kunder
    this.customers = this.customerService.customers
    this.getCustomerToEdit()
    this.customerToEdit = this.customerService.editCustomer
  }


  getCustomerToEdit() {
    let customers = this.customerService.customers // customer Array
    let customer = this.customerService.editCustomer // index number

    this.customerName = customers[customer].customerName
    this.customerId = customers[customer].customerID
    
    this.firstname = customers[customer].contacts[0].firstname
    this.lastname = customers[customer].contacts[0].lastname
    this.phone = customers[customer].contacts[0].phone
    this.eMail = customers[customer].contacts[0].eMail

    this.cOsweden = customers[customer].cOsweden
    this.cOabroad = customers[customer].cOabroad
    this.cOcomments = customers[customer].cOcomments
  }

    //for radiobuttons
    sections: any = [
      'solsidan',
      'dannes',
      'bong'
    ]



  newContact() {
    let customer = this.customerService.customers[this.customerToEdit]
    let newContact = this.createContact(this.firstname, this.lastname, this.phone, this.eMail)
    customer.contacts.push(newContact)
    this.customerService.setCustomers()
  }



  deleteCustomer() {
    this.router.navigate(['kunder'])

    //använd dig av customerService som mellanhand
    let index = this.customerService.editCustomer
    this.customerService.customers.splice(index, 1)
    this.customerService.setCustomers()
    this.customers = this.customerService.customers

    console.log(index)
    console.log(this.customerService.customers)
    console.log(this.customers)
  }



 
  onSubmit() {
    let customer = this.customerService.customers[this.customerService.editCustomer]
    customer.customerName = this.customerName
    customer.customerID = this.customerId
    customer.section = this.section


    customer.contacts[0].firstname = this.firstname
    customer.contacts[0].lastname = this.lastname
    customer.contacts[0].phone = this.phone
    customer.contacts[0].eMail = this.eMail

    customer.cOsweden = this.cOsweden
    customer.cOabroad = this.cOabroad
    customer.cOcomments = this.cOcomments

    this.customerService.customers.splice(this.customerToEdit, 1, customer)
    this.customerService.setCustomers()
  
    this.router.navigate(['kunder'])
  }
  
  createContact(firstname, lastname, phone, eMail) {
    return {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      eMail: eMail
    }
  }

  stepBack() {
    this.router.navigate(['kunder'])
  }
  

  getCustomerName(name) {
    this.customerName = name.viewModel
    console.log(this.customerName)
  }
  
  
  getCustomerId(Id) {
    this.customerId = Id.viewModel
    console.log(this.customerId)
  }
  
  getSection(event) {
    this.section = event.target.value
    console.log(this.section)

  }
  
  getFirstname(fn) {
    this.firstname = fn.value
    console.log(this.firstname)
  }
  
  getLastname(ln) {
    this.lastname = ln.value
    console.log(this.lastname)
  }
  
  getPhone(ph) {
    this.phone = ph.value
    console.log(this.phone)
  }
  
  getEmail(em) {
    this.eMail = em.value
    console.log(this.eMail)
  }
  
  getSweden(sv) {
    this.cOsweden = sv.value
    console.log(this.cOsweden)
  }
  
  getAbroad(ab) {
    this.cOabroad = ab.value
    console.log(this.cOabroad)
  }
  
  getComments(cm) {
    this.cOcomments = cm.value
    console.log(this.cOcomments)
  }

}