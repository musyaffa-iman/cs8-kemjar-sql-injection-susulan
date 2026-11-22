const { Pool } = require("@neondatabase/serverless");
require("dotenv").config();

// Pemakaian: node reset-flags.js [account_id]
async function resetFlags() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const target = process.argv[2];
  try {
    const res = target
      ? await pool.query("UPDATE flag_vault SET is_validated = FALSE WHERE account_id = $1 RETURNING *", [target])
      : await pool.query("UPDATE flag_vault SET is_validated = FALSE RETURNING *");
    console.log(`✅ ${res.rowCount} baris flag di-reset ke FALSE.`);
  } catch (err) {
    console.error("❌ Gagal mereset flag:", err);
  } finally {
    await pool.end();
  }
}

resetFlags();
