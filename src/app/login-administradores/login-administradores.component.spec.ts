import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdministradoresComponent } from './login-administradores.component';

describe('LoginAdministradoresComponent', () => {
  let component: LoginAdministradoresComponent;
  let fixture: ComponentFixture<LoginAdministradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAdministradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
