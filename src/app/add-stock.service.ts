import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class AddStockService {
  socket = io('http://localhost:1111');
  a = this.socket.on('new-message',  (data) =>{
    console.log("111");
    this.updateStocks()
    console.warn("new-message", data);
  })
  constructor(private http: HttpClient) { }
  allStocksToSubmit: any[] = []
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  submitStockDetails(formValue) {
    this.allStocksToSubmit.push(formValue);
    console.warn(this.allStocksToSubmit);

  }
  updateStocks(){
    console.warn("updateStocks");
    
  }
  submitAllStocks() {
    this.socket.emit('save-message', this.allStocksToSubmit);
    // this.sendData().subscribe((data) => {
    //   console.log("Data", data)
    // })
  }
  // sendData(): Observable<any> {
  //   return this.http.post(this.addToArray, JSON.stringify(this.allStocksToSubmit), { headers: this.httpOptions.headers })
  // }
}