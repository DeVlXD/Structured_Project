const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = 6000;

app.use(express.json());

// 404, Not Found
app.use((req, res) => res.error(404, "NOT_FOUND"));

app.use("/api/V1", v1Routes);

// Error handling
app.use((error, req, res, next) => {
  console.error(error);
  next();
  return res.error(400, error.message || error);
});

// Listening & Initializing
app.listen(process.env.PORT, async () => {
    console.log(`Environment:`, process.env.NODE_ENV);
    console.log(`Running on:`, process.env.PORT);
    connection.mongodb();
});