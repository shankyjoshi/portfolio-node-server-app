require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const stripeRoutes = require("./routes/stripeRoutes");

// express app
const app = express();

//allow cors
const cors = require("cors");
app.use(
  cors({
    // credentials: true,
    origin: "*",
  })
);

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
// routes
app.use("/api", authRoutes);
app.use("/api", stripeRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & Listening on Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
