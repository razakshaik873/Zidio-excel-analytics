require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const protectedRoute = require("./routes/protected"); // ✅ add this line

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("🌐 Backend is working!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoute); // ✅ protect with JWT

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("✅ Server running on port ${PORT}");
});
