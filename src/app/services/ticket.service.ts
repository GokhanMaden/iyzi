import { Injectable, Inject } from '@angular/core';
import { Ticket } from '../models/ticket';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TicketService {

  constructor(private http: Http, @Inject('apiUrl') private apiUrl) { }

  getProducts(): Observable<Ticket[]> {

    return this.http.get(this.apiUrl + 'tickets')
      .map(response => response.json());

  }

  addTickets(startDate: any, endDate: any, type: string, price: number, currency: string): Observable<Ticket> {
    let url: string;
    url = this.apiUrl + 'tickets';
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    console.log('?!?!?!?')

    var requestOptions = new RequestOptions({ headers: headers });

    return this.http.post(url, JSON.stringify({
      startDate: startDate,
      endDate: endDate,
      type: type,
      price: price,
      currency: currency
    }), requestOptions)
      .map(response => response.json())
  }

  makePayments(processId: number, createDate: any, cardNumber:number, promotionCode: any): Observable<Ticket> {
    let url: string;
    url = this.apiUrl + 'payment';
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');

    var requestOptions = new RequestOptions({ headers: headers });

    return this.http.post(url, JSON.stringify({
      processId: processId,
      createDate: createDate,
      cardNumber: cardNumber,
      promotionCode: promotionCode
    }), requestOptions)
      .map(response => response.json())
  }


}
