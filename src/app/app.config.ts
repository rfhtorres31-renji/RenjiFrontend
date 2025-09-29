import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './services/auth.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor]) // ✅ register here
    ),
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule)
  ],
  
};
