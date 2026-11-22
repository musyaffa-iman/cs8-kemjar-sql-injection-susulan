const express = require("express");
const router = express.Router();
const accountService = require("../services/accountService");

// POST /api/account/verify  body: { user, pass }
router.post("/verify", async (req, res) => {
  const { user, pass } = req.body || {};
  try {
    const result = await accountService.verifyCredentials(user, pass);
    if (result.length === 0) return res.status(404).json({ status: "error", error: "Credentials not valid" });
    res.json({ status: "ok", result });
  } catch (err) {
    console.error("verify failed:", err.message);
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
});

module.exports = router;
