import { TestBed, inject } from '@angular/core/testing';

import { FormrendererService } from './formrenderer.service';

describe('FormrendererService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormrendererService]
    });
  });

  it('should be created', inject([FormrendererService], (service: FormrendererService) => {
    expect(service).toBeTruthy();
  }));
});
