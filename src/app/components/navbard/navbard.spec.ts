import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbard } from './navbard';

describe('Navbard', () => {
  let component: Navbard;
  let fixture: ComponentFixture<Navbard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
