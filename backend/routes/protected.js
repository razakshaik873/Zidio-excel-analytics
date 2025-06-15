// backend/routes/protectedRoute.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.get("/profile", verifyToken, (req, res) => {
  // If token is valid, req.user contains the decoded token data
  res.json({ message: "Welcome!", user: req.user });
});

module.exports = router;
