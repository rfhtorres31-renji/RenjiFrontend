import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Incidentreport } from './incidentreport';

describe('Incidentreport', () => {
  let component: Incidentreport;
  let fixture: ComponentFixture<Incidentreport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Incidentreport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Incidentreport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
