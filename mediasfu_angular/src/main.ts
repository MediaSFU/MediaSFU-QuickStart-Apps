import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppUniqueComponent } from './app/app.component';

bootstrapApplication(AppUniqueComponent, appConfig)
  .catch((err) => console.error(err));
