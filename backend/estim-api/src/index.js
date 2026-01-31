// src/index.js
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Import des données
const event = require('./data/events.json');
const plan = require('./data/schedule.json');

const events = event;
const schedule = plan.schedule;

const app = new Hono();

// --- MIDDLEWARE CORS ---
// Ajoute "http://localhost:5173" car c'est le port par défaut de Vite (ton frontend)
// 5500 est le port de l'API.
app.use('/*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5500'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// --- ROUTES ---
app.get('/', (c) => c.text('API Hono en JS marche !'));

// Retourne la liste complète (avec la clé "schedule")
app.get('/api/schedule', (c) => c.json(schedule));

app.get('/api/events', (c) => c.json(events));

// --- LANCEMENT DU SERVEUR ---
const port = 5500;
console.log(`🚀 Serveur JS sur http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});