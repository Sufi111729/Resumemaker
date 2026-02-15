export default function Stepper({ step }) {
  const steps = [
    { id: 1, label: "Fill" },
    { id: 2, label: "Template" },
    { id: 3, label: "Payment" },
    { id: 4, label: "Download" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold border ${
            step === item.id
              ? "bg-slate-900 text-white border-slate-900"
              : "border-slate-200 dark:border-slate-700 text-slate-500"
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            {item.id}
          </span>
          {item.label}
        </div>
      ))}
    </div>
  );
}
