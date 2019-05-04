import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class AddStockService {
  socket = io('http://localhost:1111');
  stocks: Stock[] = []
  stocksToManipulate: History[] = []
  receivedData = this.socket.on('new-message', (data) => {
    this.updateStocks(data.message)
  })
  constructor(private http: HttpClient) { }
  allStocksToSubmit: any[] = []
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  submitStockDetails(formValue) {
    formValue.stockName = formValue.stockName.toUpperCase()
    this.allStocksToSubmit.push(formValue);
  }
  updateStocks(data) {
    for (let i = 0; i < data.length; i++) {
      var find = []
      for (let j = 0; j < this.stocksToManipulate.length; j++) {
        if (this.stocksToManipulate[j].name == data[i].stockName) {
          find.push(1)
        } else {
          find.push(0)
        }
      }
      if (find.includes(1)) {
        for (let k = 0; k < this.stocksToManipulate.length; k++) {
          if (this.stocksToManipulate[k].name == data[i].stockName) {
            this.stocksToManipulate[k].history.push({ price: data[i].stockValue, time: new Date() })
          }
        }
      } else {
        this.stocksToManipulate.push({ name: '', history: [] })
        this.stocksToManipulate[this.stocksToManipulate.length - 1].name = data[i].stockName;
        this.stocksToManipulate[this.stocksToManipulate.length - 1].history.push({ price: data[i].stockValue, time: new Date() })
      }
      find = []
    }
    this.stocksToManipulate.forEach(x => {

    });

  }
  submitAllStocks() {
    this.socket.emit('save-message', this.allStocksToSubmit);
    this.allStocksToSubmit = []
  }
}
export interface Stock {
  name;
  upDown;
  price;
  change;
  timeLastUpdate;
}
export interface History {
  name;
  history: any[];
}