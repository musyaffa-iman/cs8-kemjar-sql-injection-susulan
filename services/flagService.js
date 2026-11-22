const { pool } = require("../db");

// Aman (parameterized).
exports.submitFlag = async (accountId, flag) => {
  const updated = await pool.query(
    `UPDATE flag_vault SET is_validated = TRUE
     WHERE account_id = $1 AND flag = $2
     RETURNING account_id, is_validated`,
    [accountId, flag]
  );
  if (updated.rows.length === 0) return { status: "error", message: "Flag rejected", data: [] };
  return { status: "ok", message: "Flag accepted", data: updated.rows };
};
