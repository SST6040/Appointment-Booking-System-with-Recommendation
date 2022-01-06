import { TestBed } from '@angular/core/testing';

import { UserGenderService } from './user-gender.service';

describe('UserGenderService', () => {
  let service: UserGenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
