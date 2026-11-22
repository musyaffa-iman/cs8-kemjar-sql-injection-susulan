const { pool } = require("../db");

// ⚠️ SENGAJA RENTAN SQL INJECTION (materi praktikum).
// Konteks: string di dalam kurung, 5 kolom.
exports.signIn = async (user, pass) => {
  const query = `
    SELECT id, full_name, username, email, role FROM accounts
    WHERE (username = '${user}' AND password = '${pass}')
  `;
  const result = await pool.query(query);
  return result.rows.length === 0 ? null : result.rows;
};
