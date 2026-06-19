import { describe, it, expect, beforeEach } from 'vitest';
import { DataCarrito } from './data-carrito';
import { MProduct } from '../../models/Product';

describe('Servicio DataCarrito', () => {
  let servicio: DataCarrito;
  let productoMock: MProduct;

  beforeEach(() => {
    servicio = new DataCarrito();
    productoMock = { 
      id: 1, 
      nombre: 'Camiseta', 
      precio: 50, 
      stock: 10, 
      descripcion: 'Algodón', 
      marca: 'Genérica', 
      imagen: 'img.png' 
    };
  });

  it('Validar creacion carrito vacio ', () => {

    expect(servicio.estaVacio()).toBe(true);
    expect(servicio.obtenerItems().length).toBe(0);
  });

  it('Validar agregado un producto al carrito', () => {

    servicio.agregarProducto(productoMock, 1);

    expect(servicio.estaVacio()).toBe(false);
    expect(servicio.obtenerItems().length).toBe(1);
    expect(servicio.obtenerItems()[0].producto.nombre).toBe('Camiseta');
  });

  it('Validar cálculo del precio total', () => {
    
    servicio.agregarProducto(productoMock, 3);

    expect(servicio.obtenerPrecioTotal()).toBe(150);
  });

  it('Validar limpieza del carrito', () => {
    servicio.agregarProducto(productoMock, 1);
    
    servicio.limpiarCarrito();

    expect(servicio.estaVacio()).toBe(true);
    expect(servicio.obtenerPrecioTotal()).toBe(0);
  });

});
