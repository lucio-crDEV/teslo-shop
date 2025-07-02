import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { ProductsService } from '@/products/services/products.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})

export class GenderPageComponent {
  // imports "injects"
  route = inject(ActivatedRoute)
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  // toma los params desde el query de la url con activatedRoute
  gender = toSignal(
    this.route.params.pipe(map(({ gender }) => gender))
  )

  // Carga los productos filtrados, consultando a la api con los params de la query
  productsResource = rxResource({
    params: () => ({
      gender: this.gender(),
      offset: this.paginationService.currentPage() - 1
    }),
    stream: (request) => {
      return this.productsService.getProducts({
        gender: request.params.gender,
        offset: request.params.offset * 9
      })
    },
  })

}
