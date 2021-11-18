const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// ROUTES
app.use("/api", authRoutes);

app.listen(port, () => console.log(`Server started at ${port}`));
