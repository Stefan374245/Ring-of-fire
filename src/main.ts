import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Workaround für SSR/Hydration + Material Dialog Bug
if (typeof window !== 'undefined') {
  const observer = new MutationObserver(() => {
    const appRoot = document.querySelector('app-root');
    if (appRoot && appRoot.hasAttribute('aria-hidden')) {
      appRoot.removeAttribute('aria-hidden');
    }
  });
  observer.observe(document.body, { attributes: true, subtree: true });
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));