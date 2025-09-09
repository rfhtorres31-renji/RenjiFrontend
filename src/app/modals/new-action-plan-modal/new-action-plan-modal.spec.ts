import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActionPlanModal } from './new-action-plan-modal';

describe('NewActionPlanModal', () => {
  let component: NewActionPlanModal;
  let fixture: ComponentFixture<NewActionPlanModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewActionPlanModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewActionPlanModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
