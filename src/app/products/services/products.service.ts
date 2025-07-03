import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, delay, Observable, of, tap } from 'rxjs';

import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl

interface Options {
    limit?: number;
    offset?: number;
    gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {

    private http = inject(HttpClient);

    // El cache de products almacena un Map que se genera con el tipado ProductsResponse
    // Se genera una variable privada que alamacena un Map() compuestos por un par definido en el tipado string, ProductsResponse 
    
    // plural
    private productsCache = new Map<string, ProductsResponse>()
    
    // singular
    private productCache = new Map<string, Product>()

    // fx que retorna productos en general, filtra por cantidad, paginacion, por genero y gestiona el cache
    getProducts(options: Options): Observable<ProductsResponse> {

        // Valores por defecto para las querys 
        const { limit = 9, offset = 0, gender = '' } = options;

        // estructura de la key<string> para el par <string, ProductsResponse> del productsCache
        const key = `${limit}-${offset}-${gender}` // 9-0-''

        // evaluando si productsCache contiene la key(llave) definida arriba
        if (this.productsCache.has(key)) {
            // si la contiende corta la ejecución con un return y devuelve un Observable con los valores almacenados en caché
            return of(this.productsCache.get(key)!)
        }


        return this.http
            .get<ProductsResponse>(`${baseUrl}/products`, {
                params: {
                    limit,
                    offset,
                    gender,
                }
            })
            .pipe(
                // tap((resp) => console.log(resp)),
                // se almacena la response de la consulta en caché, para la implementación anterior que evita consultas masivas en el backend
                tap( products => this.productsCache.set(key, products)),
            );
    }

    getProductByIdSlug(idSlug: string): Observable<Product> {

        if( this.productCache.has(idSlug)){
            return of(this.productCache.get(idSlug)!)
        }
        
        
        return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
            .pipe(
                // el delay solo en la consulta a la api permite ver el loader la primera vez que se carga, luego ya al cargarse desde el cache carga automaticamente
                delay(200),
                tap( product => this.productCache.set(idSlug, product))
            )
    }
}