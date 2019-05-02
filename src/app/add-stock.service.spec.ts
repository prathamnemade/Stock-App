import { TestBed, inject } from '@angular/core/testing';

import { AddStockService } from './add-stock.service';

describe('AddStockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddStockService]
    });
  });

  it('should be created', inject([AddStockService], (service: AddStockService) => {
    expect(service).toBeTruthy();
  }));
});
