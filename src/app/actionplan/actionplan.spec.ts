import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actionplan } from './actionplan';

describe('Actionplan', () => {
  let component: Actionplan;
  let fixture: ComponentFixture<Actionplan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actionplan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actionplan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
