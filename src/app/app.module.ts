import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from '../app/modules/dashboard/dashboard.component';

import { TicketService } from '../app/services/ticket.service';
import { ToasterModule, ToasterService } from 'angular2-toaster';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ToasterModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [{ provide: 'apiUrl', useValue: 'https://omer-payment.herokuapp.com/' },
    TicketService,
    ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
