import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVacunadorComponent } from './perfil-vacunador.component';

describe('PerfilVacunadorComponent', () => {
  let component: PerfilVacunadorComponent;
  let fixture: ComponentFixture<PerfilVacunadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilVacunadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilVacunadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
