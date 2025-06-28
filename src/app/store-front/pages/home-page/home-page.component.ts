import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { ProductsService } from '@/products/services/products.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { 
  
  productsService = inject(ProductsService);
  productsResource = rxResource({
    params: () => ({}),
    stream: ( request ) => { 
      return this.productsService.getProducts({
        limit: 5,
        gender: 'women'
      })
    },
  })

 }
