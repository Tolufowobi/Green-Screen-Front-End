import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorformComponent } from './sensorform.component';

describe('ShelterformComponent', () => {
  let component: SensorformComponent;
  let fixture: ComponentFixture<SensorformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
