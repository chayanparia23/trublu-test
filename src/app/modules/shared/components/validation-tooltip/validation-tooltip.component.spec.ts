import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationTooltipComponent } from './validation-tooltip.component';

describe('ValidationTooltipComponent', () => {
  let component: ValidationTooltipComponent;
  let fixture: ComponentFixture<ValidationTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
