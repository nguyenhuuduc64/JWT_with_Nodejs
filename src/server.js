require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./config/db");
const route = require("./routes/index.route");

db.connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Khởi tạo route
route(app);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
