import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCarrito, ItemCarrito } from '../../services/Carrito/data-carrito';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  items: ItemCarrito[] = [];
  total: number = 0;

  constructor(private carritoService: DataCarrito) {}

  ngOnInit(): void {
    this.actualizarCarrito();
    console.log('Carrito inicializado');
    console.log('Items en carrito:', this.items);
    console.log('Total:', this.total);
  }

  actualizarCarrito(): void {
    this.items = this.carritoService.obtenerItems();
    this.total = this.carritoService.obtenerPrecioTotal();
    console.log('Carrito actualizado - Items:', this.items.length);
  }

  aumentarCantidad(idProducto: number): void {
    this.carritoService.aumentarCantidad(idProducto);
    this.actualizarCarrito();
  }

  disminuirCantidad(idProducto: number): void {
    this.carritoService.disminuirCantidad(idProducto);
    this.actualizarCarrito();
  }

  removerProducto(idProducto: number): void {
    this.carritoService.removerProducto(idProducto);
    this.actualizarCarrito();
  }

  limpiarCarrito(): void {
    this.carritoService.limpiarCarrito();
    this.actualizarCarrito();
  }

  estaVacio(): boolean {
    return this.carritoService.estaVacio();
  }
  

}
