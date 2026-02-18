import { TestBed } from '@angular/core/testing';

import { DataCarrito } from './data-carrito';

describe('DataCarrito', () => {
  let service: DataCarrito;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCarrito);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
