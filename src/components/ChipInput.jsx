export default function ChipInput({ label, helper, items, onAdd, onRemove, placeholder, max = 12, error }) {
  const canAdd = items.length < max;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-semibold">{label}</label>
          {helper && <div className="text-xs text-slate-500">{helper}</div>}
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 disabled:opacity-50"
        >
          Add item
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => onRemove(index, e.target.value, false)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
            <button
              type="button"
              onClick={() => onRemove(index, null, true)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              Remove
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-xs text-slate-500">Nothing added yet.</div>
        )}
      </div>
      {error && <div className="text-xs text-rose-500">{error}</div>}
    </div>
  );
}
