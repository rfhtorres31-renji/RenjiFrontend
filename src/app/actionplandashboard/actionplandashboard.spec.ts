import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actionplandashboard } from './actionplandashboard';

describe('Actionplandashboard', () => {
  let component: Actionplandashboard;
  let fixture: ComponentFixture<Actionplandashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actionplandashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actionplandashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
