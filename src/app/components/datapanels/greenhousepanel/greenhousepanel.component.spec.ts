import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhousepanelComponent } from './greenhousepanel.component';

describe('GreenhousepanelComponent', () => {
  let component: GreenhousepanelComponent;
  let fixture: ComponentFixture<GreenhousepanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenhousepanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenhousepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
