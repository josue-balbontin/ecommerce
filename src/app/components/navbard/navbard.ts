import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataCarrito } from '../../services/Carrito/data-carrito';

@Component({
  selector: 'app-navbard',
  imports: [],
  templateUrl: './navbard.html',
  styleUrl: './navbard.css',
})
export class Navbard {
  constructor(private router: Router , private carritodata : DataCarrito) {}


  obtenerCantidadCarrito(): number {
    return this.carritodata.obtenerCantidadTotal();
  }

  irACarrito(): void {
    this.router.navigate(['/carrito']);
  }

  irAProductos(): void {
    this.router.navigate(['/']);
  }
}
