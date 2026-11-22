// Jalankan sebuah file .sql ke DATABASE_URL.
// Pemakaian: node scripts/run-sql.js [path.sql]   (default: insert.sql)
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const file = process.argv[2] || path.join(__dirname, "..", "insert.sql");

(async () => {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL belum di-set di .env");
    process.exit(1);
  }
  const sql = fs.readFileSync(file, "utf8");
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await pool.query(sql);
    const a = await pool.query("SELECT count(*)::int AS n FROM accounts");
    const f = await pool.query("SELECT count(*)::int AS n FROM flag_vault");
    console.log(`✅ ${path.basename(file)} berhasil dijalankan.`);
    console.log(`   accounts  : ${a.rows[0].n} baris`);
    console.log(`   flag_vault: ${f.rows[0].n} baris`);
  } catch (err) {
    console.error("❌ Gagal:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
