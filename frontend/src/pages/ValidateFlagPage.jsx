import { useState } from "react";
import { submitFlag, session } from "../lib/api";
import Spinner from "../components/Spinner";
import Notice from "../components/Notice";

export default function ValidateFlagPage() {
  const account = session.get() || {};
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice({ type: "", text: "" });
    try {
      if (!account.id) throw new Error("Session not found. Please sign in again.");
      const res = await submitFlag(account.id, flag.trim());
      const row = res?.data?.[0];
      setNotice(
        row
          ? { type: "success", text: `Flag accepted for account #${row.account_id}. Well done!` }
          : { type: "error", text: "Flag rejected. Try again." }
      );
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-7">
        <h1 className="text-2xl font-bold">Validate Flag</h1>
        <div className="mb-6 mt-3 rounded-lg bg-slate-50 px-4 py-3 text-sm">
          <p>Signed in as <strong>{account.full_name}</strong></p>
          <p className="text-portal-muted">
            Account ID: <strong className="text-portal-ink">{account.id}</strong>
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="flag" className="label">Flag</label>
            <input id="flag" className="field font-mono" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Enter your flag" required disabled={loading} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <><Spinner /> Submitting...</> : "Submit Flag"}
          </button>
        </form>
        <Notice type={notice.type}>{notice.text}</Notice>
      </div>
    </div>
  );
}
