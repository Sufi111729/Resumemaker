import { useMemo } from "react";

export default function ShareLink({ data }) {
  const link = useMemo(() => {
    const encoded = btoa(JSON.stringify(data));
    const safe = encodeURIComponent(encoded);
    return `${window.location.origin}/portfolio?d=${safe}`;
  }, [data]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Portfolio link copied!");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">Shareable portfolio link</div>
      <div className="text-xs text-slate-500">
        Send this to recruiters. It updates as you edit.
      </div>
      <div className="flex gap-2">
        <input
          value={link}
          readOnly
          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
        />
        <button
          type="button"
          onClick={copyLink}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
        >
          Copy link
        </button>
      </div>
    </div>
  );
}
