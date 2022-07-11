import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarZonasComponent } from './editar-zonas.component';

describe('EditarZonasComponent', () => {
  let component: EditarZonasComponent;
  let fixture: ComponentFixture<EditarZonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarZonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
