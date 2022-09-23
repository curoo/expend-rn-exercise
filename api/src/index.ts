/* eslint-disable no-console */

import express, { ErrorRequestHandler, RequestHandler } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import * as db from './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${res.statusCode}`);
  next();
});

// error handling
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500);
};
app.use(errorHandler);

const protectedRoute: RequestHandler = (req, res, next) => {
  if ('user' in req.session) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// --

app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', (req, res) => {
  const { employeeId, password } = req.body;
  const user = db.login(employeeId, password);

  if (user) {
    Object.assign(req.session, { user });
    return res.json({ user });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/inventory', protectedRoute, (req, res) => {
  const inventory = db.getInventory();
  return res.json({ inventory });
});

app.post('/inventory/update', protectedRoute, (req, res) => {
  const { storeId, itemId, quantity } = req.body;
  db.updateInventory(storeId, itemId, quantity);
  return res.status(204).end();
});

app.post('/category/create', protectedRoute, (req, res) => {
  const { name } = req.body;
  const category = db.createCategory(name);
  return res.json({ category });
});

app.post('/item/create', protectedRoute, (req, res) => {
  const { categoryId, name, image } = req.body;
  const item = db.createItem(categoryId, name, image);
  return res.json({ item });
});

app.post('/reservation/create', protectedRoute, (req, res) => {
  const { storeId, itemId, quantity } = req.body;
  const reservation = db.createReservation(storeId, itemId, quantity);
  return res.json({ reservation });
});

app.post('/reservation/cancel', protectedRoute, (req, res) => {
  const { employeeId, storeId, itemId } = req.body;
  db.deleteReservation(employeeId, storeId, itemId);
  return res.status(204).end();
});

app.post('/reservation/confirm', protectedRoute, (req, res) => {
  const { employeeId, storeId, itemId } = req.body;
  db.confirmReservation(employeeId, storeId, itemId);
  return res.status(204).end();
});

// --

const server = createServer(app);

server.listen(port, () => {
  console.log(`ready @ http://localhost:${port}`);
});

process.on("SIGINT", () => {
  process.exit();
});
