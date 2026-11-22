import { Link } from "react-router-dom";
import { session } from "../lib/api";

const cards = [
  { to: "/check-password", title: "Check Your Password", desc: "Make sure the password you remember is still valid." },
  { to: "/validate-flag", title: "Validate Flag", desc: "Found your flag? Submit it here to complete the case study." },
];

export default function DashboardPage() {
  const account = session.get() || {};
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-wide text-portal-primary">Dashboard</p>
      <h1 className="mt-1 text-3xl font-bold">Hi, {account.full_name || "Student"}!</h1>
      <p className="mt-2 text-portal-muted">
        You are signed in as <span className="font-medium text-portal-ink">{account.username}</span>.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="card group p-6 transition hover:border-portal-primary">
            <h2 className="font-semibold group-hover:text-portal-primary">{c.title} &rarr;</h2>
            <p className="mt-1 text-sm text-portal-muted">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
