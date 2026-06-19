import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,
      include: [
        'src/app/components/products/products.ts',
        'src/app/components/product/product.ts',
        'src/app/components/carrito/carrito.ts',
        'src/app/services/Carrito/data-carrito.ts'
        
      ],
      exclude: ['src/**/*.spec.ts']
    }
  },
});
