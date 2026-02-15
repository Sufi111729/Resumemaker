import { useEffect, useState } from "react";

const DARK_KEY = "resume_dark_mode";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem(DARK_KEY);
    return saved ? saved === "true" : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(DARK_KEY, String(dark));
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      className="px-3 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium hover:border-accent transition"
    >
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}
