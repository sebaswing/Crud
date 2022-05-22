import { TestBed } from '@angular/core/testing';

import { VacunadoresService } from './vacunadores.service';

describe('VacunadoresService', () => {
  let service: VacunadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
