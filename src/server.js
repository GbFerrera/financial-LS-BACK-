require("dotenv/config")
require('express-async-errors')
const ErrorApp = require("./utils/ErrorApp")

const express = require("express")
const cors = require("cors")
const routes = require("./routes")

const app = express()

// Enable CORS for all requests
app.use(cors())

app.use(express.json())
app.use(routes)

// Add a simple health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV, port: process.env.PORT });
});

app.use((error, request, response, next) => {
  if (error instanceof ErrorApp) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 8080

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on Port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});