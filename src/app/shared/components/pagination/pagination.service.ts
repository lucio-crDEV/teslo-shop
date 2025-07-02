import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PaginationService {
    activateRoute = inject(ActivatedRoute);

    currentPage = toSignal(
        this.activateRoute.queryParamMap.pipe(
            map(params => params.get('page') ? + params.get('page')! : 1),
            map(page => isNaN(page) ? 1 : page)
            // el map de arriba devuelve que la currentPage es 1 al ingresar params inválidos (NaN)
            // el de abajo es una implementación similar, pero te mantiene en el valor inicial de la current page, previo a la consulta con params inválidos (NaN) 
            // map( page => isNaN(page) ? page : page)
        ), {
        initialValue: 1,
    })
}