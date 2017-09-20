import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingformComponent } from './readingform.component';

describe('ReadingformComponent', () => {
  let component: ReadingformComponent;
  let fixture: ComponentFixture<ReadingformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
