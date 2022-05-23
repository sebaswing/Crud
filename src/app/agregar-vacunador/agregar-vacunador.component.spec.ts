import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVacunadorComponent } from './agregar-vacunador.component';

describe('AgregarVacunadorComponent', () => {
  let component: AgregarVacunadorComponent;
  let fixture: ComponentFixture<AgregarVacunadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarVacunadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarVacunadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
