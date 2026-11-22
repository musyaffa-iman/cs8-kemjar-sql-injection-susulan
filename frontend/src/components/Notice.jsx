export default function Notice({ type, children }) {
  if (!children) return null;
  const style =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-800";
  return <div className={`mt-5 whitespace-pre-line rounded-lg border px-4 py-3 text-sm ${style}`}>{children}</div>;
}
