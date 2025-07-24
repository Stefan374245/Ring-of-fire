// SSR-Setup für Angular 16: Kein @angular/ssr/node, stattdessen klassisches Express-Universal-Setup nötig
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();

// Hier müsste das klassische Universal-Setup stehen, z.B.:
// const { ngExpressEngine } = require('@nguniversal/express-engine');
// app.engine('html', ngExpressEngine({ ... }));
// app.set('view engine', 'html');
// app.set('views', browserDistFolder);

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */

// SSR-Handler für Angular 16 muss ggf. mit @nguniversal/express-engine ergänzt werden

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */

// Starte den Server (nur statische Auslieferung, kein SSR)
const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */

