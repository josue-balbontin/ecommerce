import '@angular/compiler';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Carrito } from './carrito';
import { MProduct } from '../../models/Product';
import { ItemCarrito } from '../../services/Carrito/data-carrito';

/*
  Como cliente quiero poder ver todos los productos de mi carrito (productos y total) para verificar si me falta algo para poder agregar más productos o quitarlos dependiendo de qué me falta antes del pago.
*/
describe('Componente Carrito (HU-04)', () => {
  let mockCarritoService: any;

  beforeEach(() => {
    mockCarritoService = {
      obtenerItems: vi.fn(),
      obtenerPrecioTotal: vi.fn(),
      aumentarCantidad: vi.fn(),
      disminuirCantidad: vi.fn(),
      removerProducto: vi.fn(),
      limpiarCarrito: vi.fn(),
      estaVacio: vi.fn()
    };
  });

  it('Aumentar cantidad de un producto en carrito superando stock displonible no permite  ', () => {

    const producto: MProduct = { 
      id: 1, nombre: 'Zapatillas', precio: 100, stock: 2, descripcion: 'Desc', marca: 'Nike', imagen: 'img.png' 
    };
    const itemsSimulados: ItemCarrito[] = [ { producto: producto, cantidad: 2 } ];

    mockCarritoService.obtenerItems.mockReturnValue(itemsSimulados);

    const component = new Carrito(mockCarritoService);
    component.ngOnInit(); 

    component.aumentarCantidad(1);

    expect(mockCarritoService.aumentarCantidad).not.toHaveBeenCalled();


  });


});
