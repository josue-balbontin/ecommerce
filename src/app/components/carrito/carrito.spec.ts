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



});
