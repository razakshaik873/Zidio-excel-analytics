const router = require("express").Router();
const jwt = require("jsonwebtoken");

const users = []; // dummy user array for now

// REGISTER
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const user = { id: Date.now(), username, email, password };
  users.push(user);
  res.status(201).json({ message: "User registered!" });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, "secretKey", { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
