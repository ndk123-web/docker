import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose

   // Replace 'mymongodb' with your MongoDB service name in Docker Compose
  .connect("mongodb://mymongodb:27017/mynodedb")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Simple route
app.get("/", (req, res) => {
  console.log("🔧 Backend is running and connected to Docker + MongoDB");
  res.send("Hello World! MongoDB + NodeJS + Docker is working ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
