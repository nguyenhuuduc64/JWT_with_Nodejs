const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb://admin:adminPassword@127.0.0.1:27017/authentication_JWT?authSource=admin"
    );

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

module.exports = { connectDB };
