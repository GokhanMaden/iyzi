import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { Payment } from '../../models/payment';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public tickets: Ticket[];
  startDate: any;
  endDate: any;
  type: string;
  price: number;
  currency: string;
  processId: number;
  createDate: any;
  cardNumber: number;
  promotionCode: string;
  fullDate: string;
  paymentIsActive: boolean = false;
  private toasterService: ToasterService;

  constructor(private ticketService: TicketService, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getTicketList();


    console.log(this.fullDate)
  }

  popToast() {
    this.toasterService.pop('success', 'Args Title', 'Args Body');
  }


  getTicketList() {
    this.ticketService.getProducts().subscribe(returnedTickets => {
      this.tickets = returnedTickets;
    })
  }

  addTicketToList() {

    let newTicket = new Ticket;
    newTicket.startDate = this.startDate;
    newTicket.endDate = this.endDate;
    newTicket.type = this.type;
    newTicket.price = this.price;
    newTicket.currency = this.currency;

    console.log(newTicket);
    this.ticketService.addTickets(newTicket.startDate, newTicket.endDate, newTicket.type,
      newTicket.price, newTicket.currency).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
    console.log('sdafdfa')
  }

  ticketPayment() {

    let date = new Date();
    let time = date.getDate();
    let time2 = date.getMonth();
    let time3 = date.getFullYear();
    this.fullDate = time3 + '-' + time2 + '-' + time;

    let newPayment = new Payment;
    newPayment.processId = this.processId;
    newPayment.createDate = this.fullDate;
    newPayment.cardNumber = this.cardNumber;
    newPayment.promotionCode = this.promotionCode;

    this.ticketService.makePayments(newPayment.processId, newPayment.createDate,
      newPayment.cardNumber, newPayment.promotionCode).subscribe(
        res => {
          if (res['result'] != 'Card numaranız boş olamaz') {
            this.toasterService.pop('success', res['result']);
          } else {
            this.toasterService.pop('error', res['result']);
          }
        },
        err => {
          this.toasterService.pop('error', err['result'], err['result']);
        }
      );
  }
}
