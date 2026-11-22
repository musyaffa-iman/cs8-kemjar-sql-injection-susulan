import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-portal-bg px-4 text-center text-portal-ink">
      <p className="text-sm font-semibold text-portal-primary">Error 404</p>
      <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-sm text-portal-muted">The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="mt-8 rounded-lg bg-portal-primary px-5 py-2.5 font-semibold text-white hover:bg-portal-primary-dark">
        Back to sign in
      </Link>
    </div>
  );
}
