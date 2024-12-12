const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./routes/v1");
const AuthJwt = require("./helper/jwt");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./helper/errorHandler");

const app = express();
const port = process.env.PORT || 8081;

// Middleware
app.use(bodyParser.json({ limit: "35mb" }));
app.use(express.json());
app.use(cors());
app.options("*", cors());
// v1 api routes
app.use(morgan("tiny"));
// app.use(AuthJwt());
app.use("/v1", routes);
// app.use(errorHandler);

// MongoDB Connection
if (!process.env.MONGO_URL) {
  console.error("Error: MONGO_URL is not defined in the environment variables");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Graceful Shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});
