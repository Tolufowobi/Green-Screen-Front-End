import { TestBed, inject } from '@angular/core/testing';

import { IconsmanagerService } from './iconsmanager.service';

describe('IconsmanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IconsmanagerService]
    });
  });

  it('should be created', inject([IconsmanagerService], (service: IconsmanagerService) => {
    expect(service).toBeTruthy();
  }));
});
