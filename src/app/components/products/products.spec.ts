import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Products } from './products';
import { MProduct } from '../../models/Product';

/*
  HU-01: Como cliente quiero poder ver todos los productos disponibles para poder tomar una decisión de que comprar 
*/
describe('Componente Products ', () => {
  let mockRouter: any;
  let mockSupabase: any;
  let mockCdr: any;

  beforeEach(() => {
  
    mockRouter = { navigate: vi.fn() };
    mockCdr = { detectChanges: vi.fn() };
    mockSupabase = {
      obtenerPorductos: vi.fn()
    };
  });


  it('Mostrar lista de productos cunado es mayor a 0', async () => {
    /* 
    Dado que existen productos con stock mayor a 0, cuando ingreso a la pantalla principal, 
    entonces veo la lista de productos con su foto y precio.
    */

    const productosSimulados: MProduct[] = [
      { id: 1, nombre: 'Zapatillas', precio: 100, stock: 10, descripcion: 'Cómodas', marca: 'Nike', imagen: 'foto1.png' },
      { id: 2, nombre: 'Reloj', precio: 200, stock: 5, descripcion: 'Elegante', marca: 'Casio', imagen: 'foto2.png' }
    ];
   
    mockSupabase.obtenerPorductos.mockResolvedValue(productosSimulados);
    
    const component = new Products(mockRouter, mockSupabase, mockCdr);

    await new Promise(resolve => setTimeout(resolve, 0)); 

    expect(component.products.length).toBe(2);
    expect(component.products[0].nombre).toBe('Zapatillas');
    expect(component.error).toBe(false);
  });



  it('Mostrar mensaje de error si falla la carga', async () => {
    /*
     Dado que haya un fallo al cargar los productos, cuando intento cargar el catálogo, 
    entonces se mostrar un error que diga “no se pudo acceder intente más tarde”
    */
    mockSupabase.obtenerPorductos.mockRejectedValue(new Error('Network error'));

    const component = new Products(mockRouter, mockSupabase, mockCdr);
    await new Promise(resolve => setTimeout(resolve, 0)); 

    expect(component.error).toBe(true);
    expect(component.mensajeError).toBe('No se pudo acceder, intente más tarde');
  });

  it('No hay productos en la base dee datos muestro mensaje', async () => {
    /* 
    Dado que la base de datos no tiene absolutamente ningún producto registrado, cuando ingreso a la pantalla principal,
     entonces la interfaz no se rompe y muestra el mensaje amigable "Aún no hay productos disponibles en la tienda".
    */

    mockSupabase.obtenerPorductos.mockResolvedValue([]);

    const component = new Products(mockRouter, mockSupabase, mockCdr);
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(component.products.length).toBe(0);
    expect(component.error).toBe(false);

    expect(component.mensajeVacio).toBe("Aun no hay productos disponibles en la tienda."); 


  });

});
