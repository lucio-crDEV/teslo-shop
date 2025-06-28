import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductsService } from '@/products/services/products.service';
import { ProductCarouselComponent } from '@/products/components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  // Extrayendo el idSlug del parametro de la ruta activa
  // usando activatedRoute para obtener los parametros de la ruta activa
  // con snapshot porque el idSlug no es dinamico, y se mantiene durante la vida del componente
  // si fuera dinamico, se podría usar el observable params de activatedRoute
  // porque ahí estaríamos actualizando el idSlug al tiempo que cambie la ruta
  productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: (request) => this.productService.getProductByIdSlug(request.params.idSlug)
  })

}
