import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVacunadoresComponent } from './login-vacunadores.component';

describe('LoginVacunadoresComponent', () => {
  let component: LoginVacunadoresComponent;
  let fixture: ComponentFixture<LoginVacunadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginVacunadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginVacunadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
