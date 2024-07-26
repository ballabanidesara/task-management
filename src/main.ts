import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app/app.routes';
import { TaskEffects } from './app/state/task.effects';
import { taskReducer } from './app/state/task.reducer';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({ tasks: taskReducer }),
    provideEffects([TaskEffects]),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
  ]
}).catch((err) => console.error(err));
