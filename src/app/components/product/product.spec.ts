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

/*
  HU-03: Como cliente quiero poder agregar productos a mi carrito para poder comprarlos todos juntos en un solo pago en un futuro
*/
describe('Componente Product', () => {
  let mockSupabase: any;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockCarritoService: any;
  let mockCdr: any;

  beforeEach(() => {
    mockSupabase = { obtenerProductoPorId: vi.fn() };
    mockActivatedRoute = { snapshot: { paramMap: { get: vi.fn().mockReturnValue('1') } } };
    mockRouter = { navigate: vi.fn() };
    mockCarritoService = { agregarProducto: vi.fn() };
    mockCdr = { detectChanges: vi.fn() };
  });


  it('Agregar al carrito si el producto tiene stock', async () => {
    /*
    Dado que estoy en el detalle de un producto con stock, cuando presiono “Agregar al carrito”,
     entonces el contador del carrito aumenta y el producto se guarda 
    */

    const productoConStock: MProduct = { 
      id: 1, nombre: 'Zapatillas', precio: 100, stock: 10, descripcion: 'Desc', marca: 'Nike', imagen: 'img.png' 
    };
    mockSupabase.obtenerProductoPorId.mockResolvedValue(productoConStock);

    const component = new Product(mockSupabase, mockActivatedRoute, mockRouter, mockCarritoService, mockCdr);
    component.ngOnInit();
    await new Promise(resolve => setTimeout(resolve, 0)); 

    component.agregarAlCarrito();


    expect(mockCarritoService.agregarProducto).toHaveBeenCalledWith(productoConStock, 1);
    expect(component.error).toBe(false); 
  });

 
  it('Agregar al carrito si el producto tiene stock', async () => {
    /*
    Dado que intento agregar un producto sin stock cuando presiono agregar, 
    entonces el sistema muestra una alerta “no hay stock disponible intente más tarde”
    */
    const productoSinStock: MProduct = { 
      id: 2, nombre: 'Zapatillas', precio: 100, stock: 0, descripcion: 'Desc', marca: 'Nike', imagen: 'img.png' 
    };
    mockSupabase.obtenerProductoPorId.mockResolvedValue(productoSinStock);

    const component = new Product(mockSupabase, mockActivatedRoute, mockRouter, mockCarritoService, mockCdr);
    component.ngOnInit();
    await new Promise(resolve => setTimeout(resolve, 0)); 

    component.agregarAlCarrito();

    expect(mockCarritoService.agregarProducto).not.toHaveBeenCalled();
    expect(component.error).toBe(true);
    expect(component.mensajeerror).toBe('no hay stock disponible intente más tarde');
  });

  it( 'Producto eliminado justo cuando entra a la pantalla de detalle'  , async ()=>{
    /*
    Dado que selecciono un producto que fue eliminado por el administrador hace unos segundos, cuando carga la pantalla de detalle,
     entonces veo un mensaje "El producto ya no está disponible".
    */ 

    mockSupabase.obtenerProductoPorId.mockResolvedValue(null);

    const component = new Product(mockSupabase, mockActivatedRoute, mockRouter, mockCarritoService, mockCdr);
    component.ngOnInit();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(component.product).toBeNull();
    expect(component.error).toBe(true);
    expect(component.mensajeerror).toBe('El producto ya no está disponible');


  })

});
