import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoVacunasDesdeVacunadorComponent } from './ingreso-vacunas-desde-vacunador.component';

describe('IngresoVacunasDesdeVacunadorComponent', () => {
  let component: IngresoVacunasDesdeVacunadorComponent;
  let fixture: ComponentFixture<IngresoVacunasDesdeVacunadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoVacunasDesdeVacunadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoVacunasDesdeVacunadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
