const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

// POST /api/auth/signin  body: { user, pass }
router.post("/signin", async (req, res) => {
  const { user, pass } = req.body || {};
  try {
    const accounts = await authService.signIn(user, pass);
    if (!accounts) return res.status(401).json({ status: "error", error: "Wrong username or password" });
    res.json({ status: "ok", accounts });
  } catch (err) {
    console.error("signin failed:", err.message);
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
});

module.exports = router;
