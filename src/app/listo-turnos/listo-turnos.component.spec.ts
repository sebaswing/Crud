import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListoTurnosComponent } from './listo-turnos.component';

describe('ListoTurnosComponent', () => {
  let component: ListoTurnosComponent;
  let fixture: ComponentFixture<ListoTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListoTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListoTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
