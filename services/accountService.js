const { pool } = require("../db");

// ⚠️ SENGAJA RENTAN SQL INJECTION (materi praktikum).
// Konteks: string di dalam kurung, 3 kolom. UI hanya menampilkan email,
// tapi response JSON ikut membawa username & password.
exports.verifyCredentials = async (user, pass) => {
  const query = `
    SELECT username, email, password FROM accounts
    WHERE (username = '${user}' AND password = '${pass}')
  `;
  const result = await pool.query(query);
  return result.rows;
};
