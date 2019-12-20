const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// load env variables
dotenv.config({ path: "./config/config.env" });

// connect to db
connectDB();

// middleware
// const logger = require("./middleware/logger");

// route files
const bootcamps = require("./routes/bootcamps");

const app = express();

// Body Parser
app.use(express.json());

// middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// app.use(logger);

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
