import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { ProductsService } from '@/products/services/products.service';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { 
  productsService = inject(ProductsService);
  activateRoute = inject(ActivatedRoute)
  
  currentPage = toSignal(
    this.activateRoute.queryParamMap.pipe(
      map( params => params.get('page') ? + params.get('page')! : 1 ),
      map( page => isNaN(page) ? 1 : page)
      // el map de arriba devuelve que la currentPage es 1 al ingresar params inválidos (NaN)
      // el de abajo es una implementación similar, pero te mantiene en el valor inicial de la current page, previo a la consulta con params inválidos (NaN) 
      // map( page => isNaN(page) ? page : page)
    ), {
      initialValue: 1,
    })



  productsResource = rxResource({
    // agregar params al rxResource, como objeto {key:value}, que incorpore la señal de current page
    params: () => ({ page: this.currentPage()-1 }),
    stream: ( request ) => { 
      return this.productsService.getProducts({ 
        // se debe considerar que bajo esta implementación, la consulta se estará saltando los 9 primeros productos, pues:  currentPage=1 -> 9x1=9 -> offset= 9
        // así que debe queda  como la siguiente línea: (o como esta actualmente el params de arriba, ambas sirven)
        // offset: request.params.page * 9,
        offset: request.params.page * 9,
       })
    },
  })

 }
