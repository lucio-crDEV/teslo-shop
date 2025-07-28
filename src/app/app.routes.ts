import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')
        
    },
    // orden importante, path vacío debiese ser el último para que pase en primer luegar las rutas específicamente definidas
    {
        path: '',
        loadChildren: () => import('./store-front/store-front.routes'),
    },
];