import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListoVacunadoresComponent } from './listo-vacunadores.component';

describe('ListoVacunadoresComponent', () => {
  let component: ListoVacunadoresComponent;
  let fixture: ComponentFixture<ListoVacunadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListoVacunadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListoVacunadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
