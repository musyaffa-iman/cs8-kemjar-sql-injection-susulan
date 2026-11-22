require("dotenv").config();
require("isomorphic-fetch");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const flagRoutes = require("./routes/flag");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "NetLab Student Portal API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/flag", flagRoutes);

app.use((req, res) => res.status(404).json({ status: "error", error: "Not found" }));

const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
}

module.exports = app;
