import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformfieldComponent } from './dynamicformfield.component';

describe('DynamicformfieldComponent', () => {
  let component: DynamicformfieldComponent;
  let fixture: ComponentFixture<DynamicformfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicformfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicformfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
