import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingpanelComponent } from './readingpanel.component';

describe('ReadingpanelComponent', () => {
  let component: ReadingpanelComponent;
  let fixture: ComponentFixture<ReadingpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
