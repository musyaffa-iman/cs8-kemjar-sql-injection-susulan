import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, session } from "../lib/api";
import Spinner from "../components/Spinner";
import Notice from "../components/Notice";
import logo from "../assets/netlab2.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice({ type: "", text: "" });
    try {
      const { accounts } = await signIn(user, pass);
      if (accounts.length === 1) {
        session.set(accounts[0]);
        navigate("/dashboard");
      } else {
        setNotice({ type: "success", text: "Hello: " + accounts.map((a) => a.full_name).join(", ") });
      }
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-portal-bg px-4 py-10 text-portal-ink">
      <div className="mb-6 flex items-center gap-3">
        <img src={logo} alt="NetLab" className="h-12 w-12" />
        <div>
          <p className="text-xl font-bold leading-tight">NetLab Student Portal</p>
          <p className="text-sm text-portal-muted">Keamanan Jaringan - Case Study 8</p>
        </div>
      </div>

      <div className="card w-full max-w-sm p-7">
        <h1 className="text-lg font-semibold">Sign in to your account</h1>
        <p className="mb-6 mt-1 text-sm text-portal-muted">Use the credentials given by your lab assistant.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="user" className="label">Username</label>
            <input id="user" className="field" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Enter username" required disabled={loading} />
          </div>
          <div>
            <label htmlFor="pass" className="label">Password</label>
            <input id="pass" type="password" className="field" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter password" required disabled={loading} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <><Spinner /> Signing in...</> : "Sign in"}
          </button>
        </form>

        <Notice type={notice.type}>{notice.text}</Notice>
      </div>

      <p className="mt-6 text-xs text-portal-muted">Network Laboratory - DTE FTUI</p>
    </div>
  );
}
