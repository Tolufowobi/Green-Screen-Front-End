import { TestBed, inject } from '@angular/core/testing';

import { GreenhousesService } from './greenhouses.service';

describe('GreenhousesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GreenhousesService]
    });
  });

  it('should be created', inject([GreenhousesService], (service: GreenhousesService) => {
    expect(service).toBeTruthy();
  }));
});
