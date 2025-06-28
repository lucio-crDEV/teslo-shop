import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ProductsResponse } from '@products/interfaces/product.interface';
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

    getProducts(options: Options): Observable<ProductsResponse> {

        // Desestructurando las opciones para definir valores por defecto mientras siguen prototipado de la interface
        const { limit = 9, offset = 0, gender = '' } = options;

        return this.http
            .get<ProductsResponse>(`${baseUrl}/products`, {
                params: {
                    limit,
                    offset,
                    gender,
                }
            })
            .pipe(tap((resp)=> console.log(resp)));
    }
}