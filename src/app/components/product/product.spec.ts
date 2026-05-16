import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { Product } from './product';
import { Supabase } from '../../services/supabase/supabase';
import { DataCarrito } from '../../services/Carrito/data-carrito';
import { MProduct } from '../../models/Product';

const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe('Product (HU-02 & HU-03)', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;
  let supabaseMock: any;
  let carritoMock: any;

  beforeEach(async () => {
    supabaseMock = {
      obtenerProductoPorId: vi.fn()
    };
    carritoMock = {
      agregarProducto: vi.fn()
    };

    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [Product],
      providers: [
        provideRouter([]),
        { provide: Supabase, useValue: supabaseMock },
        { provide: DataCarrito, useValue: carritoMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  it('HU-02: Dado que selecciono un producto del catálogo, cuando carga la pantalla de detalle, entonces veo la foto ampliada, el precio, la descripción y el stock disponible.', async () => {
    const mockProduct: MProduct = { id: 1, nombre: 'Producto 1', precio: 100, descripcion: 'Desc1', stock: 5, marca: 'Marca1', imagen: 'foto1.png' };
    const productPromise = Promise.resolve(mockProduct);
    supabaseMock.obtenerProductoPorId.mockReturnValue(productPromise);

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
    await productPromise;
    await flushPromises();
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.product-title')).nativeElement;
    const priceEl = fixture.debugElement.query(By.css('.price-value')).nativeElement;
    const stockEl = fixture.debugElement.query(By.css('.stock-value')).nativeElement;
    const descEl = fixture.debugElement.query(By.css('.product-description p')).nativeElement;
    const imgEl = fixture.debugElement.query(By.css('.product-image-large')).nativeElement;

    expect(titleEl.textContent).toContain('Producto 1');
    expect(imgEl.src).toContain('foto1.png');
    expect(priceEl.textContent).toContain('Bs100');
    expect(stockEl.textContent).toContain('5 unidades');
    expect(descEl.textContent).toContain('Desc1');
  });

  it('HU-02: Dado que haya un error al obtener la información, cuando se intente cargar los datos, entonces se mostrará un mensaje de "No se pudo obtener la información intente más tarde"', async () => {
    const productPromise = Promise.reject(new Error('Network error'));
    supabaseMock.obtenerProductoPorId.mockReturnValue(productPromise);

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
    await productPromise.catch(() => undefined);
    await flushPromises();
    fixture.detectChanges();

    const errorComponent = fixture.debugElement.query(By.css('app-error'));
    expect(errorComponent).toBeTruthy();
    expect(component.error).toBe(true);
    expect(errorComponent.componentInstance.error).toBe('No se pudo obtener la información intente más tarde');
  });

  it('HU-03: Dado que estoy en el detalle de un producto con stock, cuando presiono "Agregar al carrito", entonces el contador del carrito aumenta y el producto se guarda', async () => {
    const mockProduct: MProduct = { id: 1, nombre: 'Producto 1', precio: 100, descripcion: 'Desc1', stock: 5, marca: 'Marca1', imagen: 'foto1.png' };
    const productPromise = Promise.resolve(mockProduct);
    supabaseMock.obtenerProductoPorId.mockReturnValue(productPromise);

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
    await productPromise;
    await flushPromises();
    fixture.detectChanges();

    const addToCartBtn = fixture.debugElement.query(By.css('.add-to-cart-button')).nativeElement;
    addToCartBtn.click();
    fixture.detectChanges();

    expect(carritoMock.agregarProducto).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('HU-03: Dado que intento agregar un producto sin stock cuando presiono agregar, entonces el sistema muestra una alerta "No hay stock disponible intente más tarde"', async () => {
    const mockProduct: MProduct = { id: 1, nombre: 'Producto 1', precio: 100, descripcion: 'Desc1', stock: 0, marca: 'Marca1', imagen: 'foto1.png' };
    const productPromise = Promise.resolve(mockProduct);
    supabaseMock.obtenerProductoPorId.mockReturnValue(productPromise);

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
    await productPromise;
    await flushPromises();
    fixture.detectChanges();

    const addToCartBtn = fixture.debugElement.query(By.css('.add-to-cart-button')).nativeElement;
    addToCartBtn.click();
    fixture.detectChanges();

    const errorComponent = fixture.debugElement.query(By.css('app-error'));
    expect(errorComponent).toBeTruthy();
    expect(component.error).toBe(true);
    expect(errorComponent.componentInstance.error).toBe('No hay stock disponible intente más tarde');
  });
});
