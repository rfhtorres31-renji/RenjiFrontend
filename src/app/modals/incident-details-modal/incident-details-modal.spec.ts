import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailsModal } from './incident-details-modal';

describe('IncidentDetailsModal', () => {
  let component: IncidentDetailsModal;
  let fixture: ComponentFixture<IncidentDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentDetailsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentDetailsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
