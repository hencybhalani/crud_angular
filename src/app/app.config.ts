import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { tokenHttpInterceptor } from './token-http-interceptor';
import { provideToastr} from 'ngx-toastr'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideRouter(routes), provideClientHydration(), provideHttpClient(withInterceptors([tokenHttpInterceptor]),withFetch()), provideToastr(),provideAnimations()]
};

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideClientHydration(),
//     importProvidersFrom(HttpClientModule)
//   ]
// };
