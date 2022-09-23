/* eslint-disable no-console */

import express, { ErrorRequestHandler } from "express";
import { createServer } from "http";
import * as db from './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

// --

app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', (req, res) => {
  const { employeeId, password } = req.body;
  const user = db.login(employeeId, password);

  if (user) return res.json({ user });

  res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/inventory', (req, res) => {
  const inventory = db.getInventory();
  return res.json({ inventory });
});

app.post('/inventory/update', (req, res) => {
  const { storeId, itemId, quantity } = req.body;
  db.updateInventory(storeId, itemId, quantity);
  return res.status(204).end();
});

app.post('/category/create', (req, res) => {
  const { name } = req.body;
  const category = db.createCategory(name);
  return res.json({ category });
});

app.post('/item/create', (req, res) => {
  const { categoryId, name, image } = req.body;
  const item = db.createItem(categoryId, name, image);
  return res.json({ item });
});

app.post('/reservation/create', (req, res) => {
  const { storeId, itemId, quantity } = req.body;
  const reservation = db.createReservation(storeId, itemId, quantity);
  return res.json({ reservation });
});

app.post('/reservation/cancel', (req, res) => {
  const { employeeId, storeId, itemId } = req.body;
  db.deleteReservation(employeeId, storeId, itemId);
  return res.status(204).end();
});

app.post('/reservation/confirm', (req, res) => {
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
