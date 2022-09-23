/* eslint-disable no-console */

import express, { ErrorRequestHandler } from "express";
import { createServer } from "http";

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

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

// --

const server = createServer(app);

server.listen(port, () => {
  console.log(`ready @ http://localhost:${port}`);
});

process.on("SIGINT", () => {
  process.exit();
});
