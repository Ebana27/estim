import http from 'http';
import connect from 'connect';
import serveStatic from 'serve-static';
import { createServer as createVite } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = connect();

// Dev: Vite middleware for the frontend; Prod: serve static `dist`
let vite;
if (isDev) {
  vite = await createVite({ server: { middlewareMode: true } });
  app.use(vite.middlewares);
} else {
  app.use(serveStatic(path.join(__dirname, 'dist')));
}

// Fallback to index.html for SPA routes (production)
if (!isDev) {
  app.use((req, res) => {
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    fs.promises.readFile(indexPath, 'utf-8')
      .then((html) => {
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end(err.message);
      });
  });
}

// Fallback to index.html for all routes in development (SPA)
if (isDev) {
  app.use('*', (req, res, next) => {
    if (req.url.startsWith('/src/') || req.url.startsWith('/node_modules/') || req.url.startsWith('/@') || req.url.includes('.js') || req.url.includes('.css')) {
      // Laisser Vite gérer ces fichiers
      next();
    } else {
      // Pour toutes les autres routes, servir index.html
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, 'utf-8', (err, html) => {
        if (err) {
          res.statusCode = 500;
          res.end(err.message);
          return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      });
    }
  });
}

const server = http.createServer(app);

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use. Trying another port...`);
    // Essayer un port différent
    server.listen(0, () => {
      const assignedPort = server.address().port;
      console.log(`Server running on http://localhost:${assignedPort}`);
    });
  } else {
    console.error(err);
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default server;
