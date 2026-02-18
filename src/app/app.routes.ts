import { Routes } from '@angular/router';
import { Products } from './components/products/products';
import { Product } from './components/product/product';
import { Carrito } from './components/carrito/carrito';

export const routes: Routes = [
    {path: '' , component: Products},
    {path: 'product/:id' , component: Product},
    {path: 'carrito' , component: Carrito}

];
