import { useState } from "react";
import { verifyPassword } from "../lib/api";
import Spinner from "../components/Spinner";
import Notice from "../components/Notice";

export default function CheckPasswordPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice({ type: "", text: "" });
    try {
      const { result } = await verifyPassword(user, pass);
      setNotice({
        type: "success",
        text: result.map((r) => `Credentials valid for ${r.email}`).join("\n"),
      });
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-7">
        <h1 className="text-2xl font-bold">Check Your Password</h1>
        <p className="mb-6 mt-1 text-sm text-portal-muted">Enter your username and password to verify them.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="user" className="label">Username</label>
            <input id="user" className="field" value={user} onChange={(e) => setUser(e.target.value)} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="pass" className="label">Password</label>
            <input id="pass" type="password" className="field" value={pass} onChange={(e) => setPass(e.target.value)} required disabled={loading} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <><Spinner /> Checking...</> : "Check Password"}
          </button>
        </form>
        <Notice type={notice.type}>{notice.text}</Notice>
      </div>
    </div>
  );
}
