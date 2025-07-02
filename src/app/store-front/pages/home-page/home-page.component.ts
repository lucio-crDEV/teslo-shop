import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { ProductsService } from '@/products/services/products.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { 
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService)

  productsResource = rxResource({
    // agregar params al rxResource, como objeto {key:value}, que incorpore la señal de current page
    params: () => ({ page: this.paginationService.currentPage()-1 }),
    stream: ( request ) => { 
      return this.productsService.getProducts({ 
        // se debe considerar que bajo esta implementación, la consulta se estará saltando los 9 primeros productos, pues:  currentPage=1 -> 9x1=9 -> offset= 9
        // así que debe queda  como la siguiente línea: (o como esta actualmente el params de arriba, ambas sirven)
        // offset: (request.params.page-1) * 9,
        offset: request.params.page * 9,
       })
    },
  })

 }
