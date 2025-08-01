import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { routes } from './app.routes';

import { loggingInterceptor } from './shared/interceptors/logging.interceptor';
import { authInterceptor } from './auth/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //inyectando cliente http
    //utilizando fetch a diferencia de XMLHttpRequest (default)
    provideHttpClient(
      withFetch(),
      withInterceptors([
        // loggingInterceptor, 
        authInterceptor])
    ),
  ],
};
