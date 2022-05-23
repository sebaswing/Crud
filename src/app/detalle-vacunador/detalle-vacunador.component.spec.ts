import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVacunadorComponent } from './detalle-vacunador.component';

describe('DetalleVacunadorComponent', () => {
  let component: DetalleVacunadorComponent;
  let fixture: ComponentFixture<DetalleVacunadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleVacunadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleVacunadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
