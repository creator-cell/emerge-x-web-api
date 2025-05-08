const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./routes/v1");
const AuthJwt = require("./helper/jwt");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./helper/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8081;
const allowedOrigins = ["http://localhost:3001", 'https://emerge-x.com/', 'https://admin.emerge-x.com/', 'https://contact-card.emerge-x.com/'];
// Middleware functions
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));
// v1 api routes
app.use(morgan("tiny"));
// app.use(AuthJwt());
app.use(cookieParser());
app.use(AuthJwt());
app.use(errorHandler);
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
    console.log('MongoDB host', mongoose.connection.host)
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
