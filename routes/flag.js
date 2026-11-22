const express = require("express");
const router = express.Router();
const flagService = require("../services/flagService");

// POST /api/flag/submit  body: { account_id, flag }
router.post("/submit", async (req, res) => {
  const { account_id, flag } = req.body || {};
  try {
    const result = await flagService.submitFlag(account_id, flag);
    res.json(result);
  } catch (err) {
    console.error("flag submit failed:", err.message);
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
});

module.exports = router;
