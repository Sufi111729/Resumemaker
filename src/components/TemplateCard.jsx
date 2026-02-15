import TemplateBalanced from "../templates/TemplateBalanced.jsx";
import TemplateCorporate from "../templates/TemplateCorporate.jsx";

const templateMap = {
  balanced: TemplateBalanced,
  corporate: TemplateCorporate,
};

export default function TemplateCard({ id, label, selected, data, onSelect }) {
  const Template = templateMap[id];

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`text-left rounded-2xl border p-3 space-y-3 transition ${
        selected ? "border-slate-900 ring-2 ring-slate-200" : "border-slate-200"
      }`}
    >
      <div className="text-sm font-semibold">{label}</div>
      <div className="relative h-48 overflow-hidden rounded-xl bg-white border border-slate-100">
        <div className="absolute top-3 left-3 origin-top-left scale-[0.18]">
          <Template data={data} />
        </div>
      </div>
      <div className="text-xs text-slate-500">Click to preview</div>
    </button>
  );
}
