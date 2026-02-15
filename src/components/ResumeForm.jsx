import ChipInput from "./ChipInput.jsx";
import BulletInput from "./BulletInput.jsx";

const emptyEducation = { degree: "", college: "", year: "" };
const emptyExperience = { company: "", role: "", period: "", bullets: [""] };
const emptyProject = { title: "", bullets: [""] };

export default function ResumeForm({ data, onChange, errors }) {
  const updateField = (field, value) => onChange({ ...data, [field]: value });

  const updateEducation = (index, field, value) => {
    const next = data.education.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ ...data, education: next });
  };

  const updateExperience = (index, field, value) => {
    const next = data.experience.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ ...data, experience: next });
  };

  const updateExperienceBullet = (expIndex, bulletIndex, value, remove) => {
    const next = data.experience.map((item, i) => {
      if (i !== expIndex) return item;
      if (remove) {
        return {
          ...item,
          bullets: item.bullets.filter((_, b) => b !== bulletIndex),
        };
      }
      return {
        ...item,
        bullets: item.bullets.map((b, bi) => (bi === bulletIndex ? value : b)),
      };
    });
    onChange({ ...data, experience: next });
  };

  const updateProject = (index, field, value) => {
    const next = data.projects.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ ...data, projects: next });
  };

  const updateProjectBullet = (projIndex, bulletIndex, value, remove) => {
    const next = data.projects.map((item, i) => {
      if (i !== projIndex) return item;
      if (remove) {
        return {
          ...item,
          bullets: item.bullets.filter((_, b) => b !== bulletIndex),
        };
      }
      return {
        ...item,
        bullets: item.bullets.map((b, bi) => (bi === bulletIndex ? value : b)),
      };
    });
    onChange({ ...data, projects: next });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="text-sm font-semibold">Personal</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Full name</label>
            <input
              value={data.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="e.g. Sufi Ahmed"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
            {errors.fullName && (
              <div className="text-xs text-rose-500">{errors.fullName}</div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Role / Title</label>
            <input
              value={data.role}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder="Frontend developer"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Email</label>
            <input
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@email.com"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
            {errors.email && (
              <div className="text-xs text-rose-500">{errors.email}</div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Phone</label>
            <input
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="10-digit number"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
            {errors.phone && (
              <div className="text-xs text-rose-500">{errors.phone}</div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">City</label>
            <input
              value={data.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Hyderabad, IN"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">LinkedIn</label>
            <input
              value={data.linkedin}
              onChange={(e) => updateField("linkedin", e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">GitHub</label>
            <input
              value={data.github}
              onChange={(e) => updateField("github", e.target.value)}
              placeholder="github.com/username"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold">Professional Summary</label>
        <textarea
          value={data.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="2-4 lines about your strongest skills and impact."
          rows={4}
          maxLength={600}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        />
        <div className="text-xs text-slate-500">
          Keep this concise for a single-page resume.
        </div>
      </div>

      <ChipInput
        label="Skills"
        helper="Add at least 1 skill. Keep it concise."
        placeholder="React"
        items={data.skills}
        error={errors.skills}
        onAdd={() => onChange({ ...data, skills: [...data.skills, ""] })}
        onRemove={(index, value, remove) => {
          if (remove) {
            const next = data.skills.filter((_, i) => i !== index);
            onChange({ ...data, skills: next });
          } else {
            const next = data.skills.map((item, i) =>
              i === index ? value : item
            );
            onChange({ ...data, skills: next });
          }
        }}
      />

      <ChipInput
        label="Certifications"
        helper="Optional, 1-3 highlights."
        placeholder="AWS Cloud Practitioner"
        items={data.certifications}
        onAdd={() =>
          onChange({ ...data, certifications: [...data.certifications, ""] })
        }
        onRemove={(index, value, remove) => {
          if (remove) {
            const next = data.certifications.filter((_, i) => i !== index);
            onChange({ ...data, certifications: next });
          } else {
            const next = data.certifications.map((item, i) =>
              i === index ? value : item
            );
            onChange({ ...data, certifications: next });
          }
        }}
      />

      <ChipInput
        label="Languages"
        helper="Optional"
        placeholder="English"
        items={data.languages}
        onAdd={() => onChange({ ...data, languages: [...data.languages, ""] })}
        onRemove={(index, value, remove) => {
          if (remove) {
            const next = data.languages.filter((_, i) => i !== index);
            onChange({ ...data, languages: next });
          } else {
            const next = data.languages.map((item, i) =>
              i === index ? value : item
            );
            onChange({ ...data, languages: next });
          }
        }}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-semibold">Experience</label>
            <div className="text-xs text-slate-500">
              Max 2 entries, 4 bullets each.
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              data.experience.length < 2 &&
              onChange({
                ...data,
                experience: [...data.experience, emptyExperience],
              })
            }
            className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 disabled:opacity-50"
            disabled={data.experience.length >= 2}
          >
            Add experience
          </button>
        </div>
        {data.experience.map((item, index) => (
          <div key={index} className="space-y-3 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="grid md:grid-cols-3 gap-2">
              <input
                value={item.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                placeholder="Company"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
              <input
                value={item.role}
                onChange={(e) => updateExperience(index, "role", e.target.value)}
                placeholder="Role"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
              <input
                value={item.period}
                onChange={(e) =>
                  updateExperience(index, "period", e.target.value)
                }
                placeholder="2022 - Present"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <BulletInput
              label="Highlights"
              items={item.bullets}
              max={4}
              onAdd={() =>
                updateExperience(index, "bullets", [...item.bullets, ""])
              }
              onRemove={(bulletIndex, value, remove) =>
                updateExperienceBullet(index, bulletIndex, value, remove)
              }
            />
            {data.experience.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const next = data.experience.filter((_, i) => i !== index);
                  onChange({ ...data, experience: next });
                }}
                className="text-xs text-rose-500"
              >
                Remove experience
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-semibold">Projects</label>
            <div className="text-xs text-slate-500">
              Max 2 entries, 4 bullets each.
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              data.projects.length < 2 &&
              onChange({ ...data, projects: [...data.projects, emptyProject] })
            }
            className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 disabled:opacity-50"
            disabled={data.projects.length >= 2}
          >
            Add project
          </button>
        </div>
        {data.projects.map((item, index) => (
          <div key={index} className="space-y-3 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
            <input
              value={item.title}
              onChange={(e) => updateProject(index, "title", e.target.value)}
              placeholder="Project name"
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
            <BulletInput
              label="Highlights"
              items={item.bullets}
              max={4}
              onAdd={() => updateProject(index, "bullets", [...item.bullets, ""])}
              onRemove={(bulletIndex, value, remove) =>
                updateProjectBullet(index, bulletIndex, value, remove)
              }
            />
            {data.projects.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const next = data.projects.filter((_, i) => i !== index);
                  onChange({ ...data, projects: next });
                }}
                className="text-xs text-rose-500"
              >
                Remove project
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-semibold">Education</label>
            <div className="text-xs text-slate-500">
              Include your latest degree.
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              onChange({ ...data, education: [...data.education, emptyEducation] })
            }
            className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800"
          >
            Add education
          </button>
        </div>
        {data.education.map((item, index) => (
          <div key={index} className="grid md:grid-cols-3 gap-2">
            <input
              value={item.degree}
              onChange={(e) => updateEducation(index, "degree", e.target.value)}
              placeholder="B.Tech in Computer Science"
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
            <input
              value={item.college}
              onChange={(e) => updateEducation(index, "college", e.target.value)}
              placeholder="ABC University"
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
            <div className="flex gap-2">
              <input
                value={item.year}
                onChange={(e) => updateEducation(index, "year", e.target.value)}
                placeholder="2024"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
              <button
                type="button"
                onClick={() => {
                  const next = data.education.filter((_, i) => i !== index);
                  onChange({ ...data, education: next });
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
