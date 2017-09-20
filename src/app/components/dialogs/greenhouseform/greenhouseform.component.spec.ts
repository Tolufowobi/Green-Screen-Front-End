import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhouseformComponent } from './greenhouseform.component';

describe('GreenhouseformComponent', () => {
  let component: GreenhouseformComponent;
  let fixture: ComponentFixture<GreenhouseformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenhouseformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenhouseformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
