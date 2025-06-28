import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ProductsResponse } from '../interfaces/product.interface';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {

    private http = inject(HttpClient);

    getProducts(): Observable<ProductsResponse> {
        return this.http.get<ProductsResponse>(
            'http://localhost:3000/api/products'
        ).pipe(
            tap((resp)=> console.log(resp)));
    }
}