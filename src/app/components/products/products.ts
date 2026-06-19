import { ChangeDetectorRef, Component } from '@angular/core';

import { MProduct } from '../../models/Product';
import {  Router } from '@angular/router';
import { Error } from '../error/error';
import { Supabase } from '../../services/supabase/supabase';

@Component({
  selector: 'app-products',
  imports: [Error],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products : MProduct[] = [];
  error : boolean = false;
  mensajeError : string = 'No se pudo acceder, intente más tarde';
  mensajeVacio : string = '';
  
  constructor(
    private router: Router,
    private supabase: Supabase,
    private cdr: ChangeDetectorRef
  ) {
    this.supabase.obtenerPorductos().then(products => {
      this.products = products;
      if(this.products.length === 0) {
        this.mensajeVacio = "Aun no hay productos disponibles en la tienda.";
      }
    
    }).catch(error => {
    console.error('Error al obtener productos:', error);
    this.error = true;
    }).finally(() => {
    this.cdr.detectChanges();
  });

  };


  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

}
