import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// bootstrapApplication(AppComponent).catch((err) => console.error(err));                 // Starting application without modules
platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => console.error(err));   // Starting application with modules
