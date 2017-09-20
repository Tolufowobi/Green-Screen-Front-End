import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorpanelComponent } from './sensorpanel.component';

describe('SensorpanelComponent', () => {
  let component: SensorpanelComponent;
  let fixture: ComponentFixture<SensorpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
