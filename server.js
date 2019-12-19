const express = require("express");
const dotenv = require("dotenv");

// route files
const bootcamps = require("./routes/bootcamps");

// load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
