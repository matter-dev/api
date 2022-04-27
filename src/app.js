const express = require("express");
const httpStatus = require("http-status");

const app = express();

app.use(express.json());

app.all("*", (req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  return next(new Error(`Route not found - ${req.url}`));
});

app.use((err, _req, res, _next) => {
  if (res.statusCode === httpStatus.OK) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }

  return res.json({
    ok: false,
    error: {
      message: err.message,
      stack: process.env.NODE_ENV !== "production" ? err.stack : "⛔",
    },
  });
});

module.exports = app;
