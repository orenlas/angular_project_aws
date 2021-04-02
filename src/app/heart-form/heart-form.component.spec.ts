import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartFormComponent } from './heart-form.component';

describe('HeartFormComponent', () => {
  let component: HeartFormComponent;
  let fixture: ComponentFixture<HeartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
