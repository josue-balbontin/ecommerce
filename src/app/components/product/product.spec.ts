import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Product } from './product';
import { MProduct } from '../../models/Product';

/*
  HU-02: Como cliente quiero poder ver los detalles de cada producto disponible para poder tomar una decisión para elegirlo
*/
describe('Componente Product', () => {
  let mockSupabase: any;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockCarritoService: any;
  let mockCdr: any;

  beforeEach(() => {
    mockSupabase = {
      obtenerProductoPorId: vi.fn()
    };
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: vi.fn().mockReturnValue('1') 
        }
      }
    };
    mockRouter = { navigate: vi.fn() };
    mockCarritoService = { agregarProducto: vi.fn() };
    mockCdr = { detectChanges: vi.fn() };
  });


  it('Cargar Prductos y mostrar informacion', async () => {
    /* 
      Dado que selecciono un producto del catálogo,cuando carga la pantalla de detalle, 
     entonces veo la foto ampliada, el precio, la descripción y el stock disponible.
    */
    const productoSimulado: MProduct = { 
      id: 1, 
      nombre: 'Zapatillas', 
      precio: 100, 
      stock: 10, 
      descripcion: 'Cómodas', 
      marca: 'Nike', 
      imagen: 'foto_ampliada.png' 
    };
    mockSupabase.obtenerProductoPorId.mockResolvedValue(productoSimulado);

    const component = new Product(
      mockSupabase, 
      mockActivatedRoute, 
      mockRouter, 
      mockCarritoService, 
      mockCdr
    );
   
    component.ngOnInit(); 
    await new Promise(resolve => setTimeout(resolve, 0)); 


    expect(component.product).toEqual(productoSimulado);
    expect(component.product?.nombre).toBe('Zapatillas');
    expect(component.product?.imagen).toBe('foto_ampliada.png');
    expect(component.error).toBe(false);
    expect(component.loading).toBe(false);
  });

  
  it('Criterio 2: Debería mostrar mensaje de error si falla la carga del detalle', async () => {
    /*
    Dado que haya un error al obtener la información, cuando se intente cargar los datos, 
    entonces se mostrará un mensaje de “no se pudo obtener la información intente más tarde “
    */

    mockSupabase.obtenerProductoPorId.mockRejectedValue(new Error('Error de conexión'));

    const component = new Product(
      mockSupabase, 
      mockActivatedRoute, 
      mockRouter, 
      mockCarritoService, 
      mockCdr
    );
    component.ngOnInit();
    await new Promise(resolve => setTimeout(resolve, 0)); 

    expect(component.error).toBe(true);
    expect(component.mensajeerror).toBe('no se pudo obtener la información intente más tarde');
    expect(component.loading).toBe(false);
  });

});
