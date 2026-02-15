import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function PortfolioPage() {
  const [params] = useSearchParams();
  const data = useMemo(() => {
    const encoded = params.get("d");
    if (!encoded) return null;
    try {
      const decoded = atob(decodeURIComponent(encoded));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }, [params]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-3">
          <h1 className="text-2xl font-bold">Portfolio Not Found</h1>
          <p className="text-sm text-slate-500">
            The link is missing or invalid.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-900 text-white"
          >
            Back to Builder
          </Link>
        </div>
      </div>
    );
  }

  const role =
    data.role ||
    (data.skills?.length ? `${data.skills[0]} Specialist` : "Professional");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <header className="rounded-3xl bg-white p-8 shadow-soft">
          <h1 className="text-4xl font-bold">
            {data.fullName || "Your Name"}
          </h1>
          <p className="text-lg text-slate-500 mt-2">{role}</p>
          <div className="mt-4 text-sm flex flex-wrap gap-3">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.city && <span>{data.city}</span>}
            {data.linkedin && <span>{data.linkedin}</span>}
            {data.github && <span>{data.github}</span>}
          </div>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.skills?.length ? (
                data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">
                  Skills will appear here.
                </span>
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">Projects</h2>
            <div className="mt-4 grid gap-4">
              {data.projects?.length ? (
                data.projects.map((project, index) => (
                  <div key={index} className="p-4 rounded-2xl border">
                    <div className="font-semibold">{project.title}</div>
                    <ul className="text-sm text-slate-500 mt-2 list-disc pl-4">
                      {project.bullets?.slice(0, 4).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <span className="text-sm text-slate-500">
                  Your projects will show up here.
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold">Contact</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.city && <span>{data.city}</span>}
            {data.linkedin && <span>{data.linkedin}</span>}
            {data.github && <span>{data.github}</span>}
          </div>
        </section>
      </div>
    </div>
  );
}
