import { Component, ViewEncapsulation } from '@angular/core';
import { AddStockService } from './add-stock.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  addStockForm: FormGroup;
  currentTime: Date;
  display: boolean = false;
  data = {};
  lineChartHeader = ""
  constructor(private formBuilder: FormBuilder, public addStockService: AddStockService) { }
  ngOnInit() {
    this.formSkeleton();
    setInterval(() => { this.currentTime = new Date() }, 1);
  }
  formSkeleton() {
    this.addStockForm = new FormGroup({
      'stockName': new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.required
      ])),
      'stockValue': new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.required
      ]))
    })
  }
  upDownCheck(stock) {
    return stock.history.length > 1 ? (stock.history[stock.history.length - 1].price - stock.history[stock.history.length - 2].price) > 0 ? 'Up' : 'Down' : 'Base';
  }
  percentChange(stock) {
    return stock.history.length > 1 ? (stock.history[stock.history.length - 1].price - stock.history[stock.history.length - 2].price) * 100 / stock.history[stock.history.length - 2].price : 0;
  }
  showLineGraph(stock) {
    this.lineChartHeader = stock;
    this.data = {}
    this.data = { labels: [], datasets: [] }
    this.data["labels"] = (this.createLabels(stock.history))
    this.data["datasets"] = (this.createDatasets(stock));
    this.display = true;
  }
  createLabels(stock) {
    var a = []
    for (let i = 0; i < stock.length; i++) {
      let time = stock[i].time
      a.push(time.toLocaleTimeString())
    }
    return a;
  }
  createValues(stock) {
    var a = []
    for (let i = 0; i < stock.length; i++) {
      a.push(stock[i].price)
    }
    return a;
  }
  createDatasets(stock) {
    var a = []
    a.push({ label: stock.name, data: this.createValues(stock.history), fill: false, borderColor: ['#565656'] })
    return a;
  }
  count = 0
  count1 = 0
  restrictLetters(e) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      this.count += 1
      return true;
    } else if (this.count > 1 && e.keyCode == 110 && this.count1 < 1) {
      this.count1 += 1
      return true;
    } else if (e.keyCode == 37 || e.keyCode == 39) {
      return true;
    } else {
      return false;
    }
  }
}