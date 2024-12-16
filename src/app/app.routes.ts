import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => import('./modules/home/home.routes').then((m) => m.routes),

    },
    {
        path: 'products',
        loadChildren: () => import('./modules/productos/productos.routes').then((m) => m.routes),
    },

    {
        path: 'carrito',
        loadChildren: () => import('./modules/carrito/carrito.routes').then((m) => m.routes),
    },
];

export const APP_ROUTER = provideRouter(routes);