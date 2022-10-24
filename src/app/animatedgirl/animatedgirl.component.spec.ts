import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedgirlComponent } from './animatedgirl.component';

describe('AnimatedgirlComponent', () => {
  let component: AnimatedgirlComponent;
  let fixture: ComponentFixture<AnimatedgirlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedgirlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedgirlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
