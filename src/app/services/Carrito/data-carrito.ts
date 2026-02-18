import { Injectable } from '@angular/core';
import { MProduct } from '../../models/Product';

export interface ItemCarrito {
  producto: MProduct;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataCarrito {
  private carrito: Map<number, ItemCarrito> = new Map();

  constructor() {}

  agregarProducto(producto: MProduct, cantidad: number = 1): void {
    const item = this.carrito.get(producto.id);
    
    if (item) {
      item.cantidad += cantidad;
    } else {
      this.carrito.set(producto.id, { producto, cantidad });
    }
    console.log('Producto agregado. Carrito actual:', this.carrito);
    console.log('Tamaño del carrito:', this.carrito.size);
  }

  removerProducto(idProducto: number): void {
    this.carrito.delete(idProducto);
  }

  aumentarCantidad(idProducto: number): void {
    const item = this.carrito.get(idProducto);
    if (item) {
      item.cantidad++;
    }
  }

  disminuirCantidad(idProducto: number): void {
    const item = this.carrito.get(idProducto);
    if (item) {
      if (item.cantidad > 1) {
        item.cantidad--;
      } else {
        this.removerProducto(idProducto);
      }
    }
  }

  obtenerItems(): ItemCarrito[] {
    const items = Array.from(this.carrito.values());
    console.log('obtenerItems llamado. Items:', items);
    return items;
  }

  obtenerCantidadTotal(): number {
    let total = 0;
    this.carrito.forEach(item => {
      total += item.cantidad;
    });
    return total;
  }

  obtenerPrecioTotal(): number {
    let total = 0;
    this.carrito.forEach(item => {
      total += item.producto.precio * item.cantidad;
    });
    return total;
  }

  limpiarCarrito(): void {
    this.carrito.clear();
  }


  estaVacio(): boolean {
    return this.carrito.size === 0;
  }

  obtenerCantidad(){
    let cantidadTotal = 0;
    this.carrito.forEach(item => {
      cantidadTotal += item.cantidad;
    });
    return cantidadTotal;
  }
}
