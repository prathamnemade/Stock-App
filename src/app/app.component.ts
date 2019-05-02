import { Component } from '@angular/core';
import { AddStockService } from './add-stock.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addStockForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public addStockService: AddStockService) { }
  ngOnInit() {
    this.formSkeleton();
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
}
