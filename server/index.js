// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const userRoutes = require("./routes/UserRoutes");
// const bodyParser = require("body-parser");

// const app = express();

// app.use("/api/user", userRoutes);

// app.use(express.json());
// mongoose
//   .connect(
//     "mongodb+srv://wajahat11122:wajahat11122@cluster0.dwkcb.mongodb.net/"
//   )
//   .then(console.log("connected"))
//   .catch((error) => {
//     console.log(error);
//   });

// app.listen(3000, () => {
//   console.log("Database Connected");
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

// Middleware for CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes after middleware
app.use("/api/user", userRoutes);

mongoose
  .connect(
    "mongodb+srv://wajahat11122:wajahat11122@cluster0.dwkcb.mongodb.net/"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
