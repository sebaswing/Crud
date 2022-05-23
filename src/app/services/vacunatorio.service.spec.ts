import { TestBed } from '@angular/core/testing';

import { VacunatorioService } from './vacunatorio.service';

describe('VacunatorioService', () => {
  let service: VacunatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
