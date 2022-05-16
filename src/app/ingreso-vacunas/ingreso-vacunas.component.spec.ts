import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoVacunasComponent } from './ingreso-vacunas.component';

describe('IngresoVacunasComponent', () => {
  let component: IngresoVacunasComponent;
  let fixture: ComponentFixture<IngresoVacunasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoVacunasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoVacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
