import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateFormComponent } from './animate-form.component';

describe('AnimateFormComponent', () => {
  let component: AnimateFormComponent;
  let fixture: ComponentFixture<AnimateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
