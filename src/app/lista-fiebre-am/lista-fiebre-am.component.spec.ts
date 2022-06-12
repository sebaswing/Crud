import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFiebreAmComponent } from './lista-fiebre-am.component';

describe('ListaFiebreAmComponent', () => {
  let component: ListaFiebreAmComponent;
  let fixture: ComponentFixture<ListaFiebreAmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFiebreAmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFiebreAmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
