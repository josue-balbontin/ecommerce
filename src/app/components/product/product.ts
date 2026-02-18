import { ChangeDetectorRef, Component } from '@angular/core';
import { MProduct } from '../../models/Product';

import { ActivatedRoute, Router } from '@angular/router';
import { Error } from '../error/error';
import { DataCarrito } from '../../services/Carrito/data-carrito';
import { Supabase } from '../../services/supabase/supabase';

@Component({
  selector: 'app-product',
  imports: [Error],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  product: MProduct | null = null;
  error :boolean = false;
  loading: boolean = true;

  constructor(
    private supabase: Supabase,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private carritoService: DataCarrito,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.supabase.obtenerProductoPorId(Number(this.activatedRoute.snapshot.paramMap.get('id'))).then(product => {
      this.product = product;
    }
    ).catch(error => {
      this.error = true;
    }).finally(() => {
      this.loading = false;
      this.cdr.detectChanges();
    });
    
  }

  goHome() {
    this.router.navigate(['/']);
  }

  agregarAlCarrito(): void {
    if (this.product) {
      if(this.product.stock <= 0){
        this.error = true;
      }
      else{
        this.carritoService.agregarProducto(this.product, 1);
      }
      
    }
  }
  
  aceptarerror(): void { 
    this.error = false;
  }
  

}