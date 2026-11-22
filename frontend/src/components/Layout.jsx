import { NavLink, useNavigate } from "react-router-dom";
import { session } from "../lib/api";
import logo from "../assets/netlab2.svg";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/check-password", label: "Check Your Password" },
  { to: "/validate-flag", label: "Validate Flag" },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const account = session.get();

  const logout = () => {
    session.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-portal-bg text-portal-ink">
      <header className="border-b border-portal-line bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8" />
            <span className="font-bold">NetLab Student Portal</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-portal-muted sm:inline">{account?.username}</span>
            <button onClick={logout} className="rounded-lg border border-portal-line px-3 py-1.5 font-medium hover:bg-slate-50">
              Log out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "border-portal-primary text-portal-primary"
                    : "border-transparent text-portal-muted hover:text-portal-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
    </div>
  );
}
