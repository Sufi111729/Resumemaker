import { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import ResumeForm from "./components/ResumeForm.jsx";
import ResumePreview from "./components/ResumePreview.jsx";
import PaymentStep from "./components/PaymentStep.jsx";
import PortfolioPage from "./components/PortfolioPage.jsx";
import Toast from "./components/Toast.jsx";
import Stepper from "./components/Stepper.jsx";
import TemplateCard from "./components/TemplateCard.jsx";
import { emptyData } from "./components/resumeData.js";

const RESUME_KEY = "resume_data_v2";
const PAYMENT_KEY = "resume_payment_v2";
const TEMPLATE_KEY = "resume_template_v2";
const SAVE_KEY = "resume_last_saved";
const PAID_AT_KEY = "paid_at";
const TOKEN_KEY = "download_token";
const TOKEN_EXP_KEY = "token_expiry";

const UPI_ID = "sufi111729@okicici";
const UPI_LINK = "upi://pay?pa=sufi111729@okicici&pn=SufiCV&am=5&cu=INR";
const AMOUNT_LABEL = "₹5";

function ResumeBuilder() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(RESUME_KEY);
    return saved ? JSON.parse(saved) : emptyData;
  });
  const [paid, setPaid] = useState(() =>
    localStorage.getItem(PAYMENT_KEY) === "true"
  );
  const [tokenExpiry, setTokenExpiry] = useState(() => {
    const raw = localStorage.getItem(TOKEN_EXP_KEY);
    return raw ? Number(raw) : 0;
  });
  const [template, setTemplate] = useState(() =>
    localStorage.getItem(TEMPLATE_KEY) || "balanced"
  );
  const [lastSaved, setLastSaved] = useState(() =>
    localStorage.getItem(SAVE_KEY)
  );
  const [toast, setToast] = useState("");
  const [errors, setErrors] = useState({});
  const printRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(RESUME_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem(PAYMENT_KEY, String(paid));
  }, [paid]);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, template);
  }, [template]);

  const shareData = useMemo(() => ({ ...data, template }), [data, template]);
  const sharePath = useMemo(() => {
    const encoded = btoa(JSON.stringify(shareData));
    return `/portfolio?d=${encodeURIComponent(encoded)}`;
  }, [shareData]);

  const validSkills = useMemo(
    () => data.skills.filter((skill) => skill.trim().length > 0),
    [data.skills]
  );

  const validateStep1 = () => {
    const next = {};
    if (!data.fullName.trim()) next.fullName = "Please add your name.";
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      next.email = "A valid email helps recruiters reach you.";
    }
    if (validSkills.length === 0) {
      next.skills = "Add at least one skill to continue.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const isStep1Valid =
    data.fullName.trim().length > 0 &&
    /^\S+@\S+\.\S+$/.test(data.email) &&
    validSkills.length > 0;

  const handleSaveDraft = () => {
    const now = new Date().toISOString();
    localStorage.setItem(SAVE_KEY, now);
    setLastSaved(now);
    setToast("Draft saved locally.");
  };

  const generateToken = () => {
    if (crypto?.randomUUID) return crypto.randomUUID();
    return Math.random().toString(36).slice(2);
  };

  const handleConfirmPaid = () => {
    const token = generateToken();
    const expiry = Date.now() + 10 * 60 * 1000;
    localStorage.setItem(PAYMENT_KEY, "true");
    localStorage.setItem(PAID_AT_KEY, new Date().toISOString());
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXP_KEY, String(expiry));
    setPaid(true);
    setTokenExpiry(expiry);
    setToast("Payment marked as successful. PDF unlocked.");
  };

  const isDownloadUnlocked = paid && tokenExpiry > Date.now();

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Start fresh? This will clear the current draft."
    );
    if (!confirmReset) return;
    localStorage.removeItem(RESUME_KEY);
    localStorage.removeItem(PAYMENT_KEY);
    localStorage.removeItem(TEMPLATE_KEY);
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(PAID_AT_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXP_KEY);
    setData(emptyData);
    setTemplate("balanced");
    setPaid(false);
    setTokenExpiry(0);
    setStep(1);
    setToast("New resume started.");
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) {
      setToast("Please finish the required fields.");
      return;
    }
    if (step === 3 && !paid) {
      setToast("Confirm payment to unlock downloads.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <header className="max-w-6xl mx-auto px-6 pt-8 pb-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-slate-600 font-semibold">
              Resume Builder
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              One-page A4 resume builder
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Print-perfect layout that always fits on a single page.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <DarkModeToggle />
            <Link
              to={sharePath}
              className="px-3 py-2 rounded-full border border-slate-200 text-sm"
            >
              Open Portfolio
            </Link>
          </div>
        </div>
        <Stepper step={step} />
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-16">
        {step === 1 && (
          <section className="bg-white rounded-3xl p-6 shadow-soft space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Draft status</span>
              {lastSaved ? (
                <span>
                  {Date.now() - new Date(lastSaved).getTime() < 10000
                    ? "Saved just now"
                    : `Saved ${new Date(lastSaved).toLocaleTimeString()}`}
                </span>
              ) : (
                <span>Not saved yet</span>
              )}
            </div>
            <ResumeForm data={data} onChange={setData} errors={errors} />
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 rounded-xl border border-slate-200"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStep1Valid}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-soft space-y-4">
              <div className="text-sm font-semibold">Choose a template</div>
              <div className="grid gap-4">
                <TemplateCard
                  id="balanced"
                  label="Balanced Layout"
                  selected={template === "balanced"}
                  data={data}
                  onSelect={setTemplate}
                />
                <TemplateCard
                  id="corporate"
                  label="Corporate Sidebar"
                  selected={template === "corporate"}
                  data={data}
                  onSelect={setTemplate}
                />
              </div>
              <div className="flex gap-3 justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 rounded-xl border border-slate-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <div className="text-sm font-semibold mb-3">Live preview</div>
              <div className="overflow-auto border border-dashed border-slate-200 rounded-2xl p-3">
                <ResumePreview ref={printRef} data={data} template={template} />
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <div className="text-sm font-semibold mb-3">Final preview</div>
              <div className="overflow-auto border border-dashed border-slate-200 rounded-2xl p-3">
                <ResumePreview ref={printRef} data={data} template={template} />
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-soft space-y-4">
              <PaymentStep
                paid={paid}
                onConfirmPaid={handleConfirmPaid}
                onToast={setToast}
                upiId={UPI_ID}
                upiLink={UPI_LINK}
                amountLabel={AMOUNT_LABEL}
              />
              <div className="flex gap-3 justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 rounded-xl border border-slate-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!paid}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="grid lg:grid-cols-[1fr_1fr] gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-soft space-y-4">
              <div>
                <div className="text-sm font-semibold">Download your PDF</div>
                <div className="text-xs text-slate-500">
                  A4 layout, print-ready.
                </div>
              </div>
              {isDownloadUnlocked ? (
                <ReactToPrint
                  trigger={() => (
                    <button className="px-4 py-2 rounded-xl bg-slate-900 text-white">
                      Download PDF (A4)
                    </button>
                  )}
                  content={() => printRef.current}
                  documentTitle={`${data.fullName || "resume"}-resume`}
                />
              ) : (
                <button
                  type="button"
                  disabled
                  className="px-4 py-2 rounded-xl bg-slate-300 text-white"
                >
                  Download PDF (A4)
                </button>
              )}
              <div className="text-xs text-slate-500">
                {isDownloadUnlocked
                  ? "Download available for 10 minutes."
                  : "Payment confirmation required."}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-soft space-y-4">
              <div>
                <div className="text-sm font-semibold">Share your portfolio</div>
                <div className="text-xs text-slate-500">
                  Your portfolio link updates as you edit.
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  value={sharePath}
                  readOnly
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `${window.location.origin}${sharePath}`
                      );
                      setToast("Portfolio link copied.");
                    } catch {
                      setToast("Copy failed. Please copy manually.");
                    }
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-200"
                >
                  Copy
                </button>
              </div>
              <Link
                to={sharePath}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 text-white"
              >
                Open Link
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl border border-slate-200"
              >
                Start New Resume
              </button>
            </div>
            <div className="absolute -left-[9999px] top-0">
              <ResumePreview ref={printRef} data={data} template={template} />
            </div>
          </section>
        )}
      </main>
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ResumeBuilder />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
    </Routes>
  );
}
