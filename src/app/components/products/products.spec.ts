import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { Products } from './products';
import { Supabase } from '../../services/supabase/supabase';
import { MProduct } from '../../models/Product';
import { vi } from 'vitest';

describe('Products (HU-01)', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;
  let supabaseMock: any;

  beforeEach(async () => {
    supabaseMock = {
      obtenerPorductos: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Products],
      providers: [
        provideRouter([]),
        { provide: Supabase, useValue: supabaseMock }
      ]
    }).compileComponents();
  });

  it('Dado que existen productos con stock mayor a 0, cuando ingreso a la pantalla principal, entonces veo la lista de productos con su foto y precio.', async () => {
    const mockProducts: MProduct[] = [
      { id: 1, nombre: 'Producto 1', precio: 100, descripcion: 'Desc1', stock: 5, marca: 'Marca1', imagen: 'foto1.png' },
      { id: 2, nombre: 'Producto 2', precio: 200, descripcion: 'Desc2', stock: 0, marca: 'Marca2', imagen: 'foto2.png' }
    ];
    const productsPromise = Promise.resolve(mockProducts);
    supabaseMock.obtenerPorductos.mockReturnValue(productsPromise);

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;

    await productsPromise;
    fixture.detectChanges();

    const productElements = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(productElements.length).toBe(1);
    
    const h3 = productElements[0].query(By.css('h3')).nativeElement;
    const pPrecio = productElements[0].queryAll(By.css('p'))[0].nativeElement;
    const img = productElements[0].query(By.css('img')).nativeElement;

    expect(h3.textContent).toContain('Producto 1');
    expect(pPrecio.textContent).toContain('Bs100');
    expect(img.src).toContain('foto1.png');
  });

  it('Dado que haya un fallo al cargar los productos, cuando intento cargar el catálogo, entonces se mostrar un error que diga "no se pudo acceder intente más tarde"', async () => {
    const productsPromise = Promise.reject(new Error('Network error'));
    supabaseMock.obtenerPorductos.mockReturnValue(productsPromise);

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;

    await productsPromise.catch(() => undefined);
    fixture.detectChanges();

    const errorComponent = fixture.debugElement.query(By.css('app-error'));
    expect(errorComponent).toBeTruthy();
    expect(component.error).toBe(true);
    expect(errorComponent.componentInstance.error).toBe('no se pudo acceder intente más tarde.');
  });
});
