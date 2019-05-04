import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { AddStockService } from './add-stock.service';
import {DataTableModule} from 'primeng/datatable';
import {MultiSelectModule} from 'primeng/multiselect';
import { TimePipe } from './timeUpdate.pipe';
import {DialogModule} from 'primeng/dialog';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,TimePipe
  ],
  imports: [
    ChartModule,DialogModule,MultiSelectModule,DataTableModule,BrowserModule,BrowserAnimationsModule,InputTextModule, FormsModule, ReactiveFormsModule,ButtonModule,HttpClientModule
  ],
  providers: [AddStockService],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
