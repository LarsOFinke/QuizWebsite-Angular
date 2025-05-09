import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { currentEnvironment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

export const api_url = currentEnvironment.api_url;
