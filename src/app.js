const express = require("express");
const httpStatus = require("http-status");
const router = require("./api/v1/routes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    ok: true,
  });
});

app.use("/api/v1", router);

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
