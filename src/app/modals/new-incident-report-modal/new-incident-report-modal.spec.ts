import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncidentReportModal } from './new-incident-report-modal';

describe('NewIncidentReportModal', () => {
  let component: NewIncidentReportModal;
  let fixture: ComponentFixture<NewIncidentReportModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewIncidentReportModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewIncidentReportModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
