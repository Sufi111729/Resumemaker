import EditableText from "../components/EditableText.jsx";

const clean = (arr) => (Array.isArray(arr) ? arr.filter((i) => i && i.trim()) : []);

export default function TemplateBalanced({ data, onEdit }) {
  const safeEdit = (path, value) => onEdit && onEdit(path, value);

  const contacts = clean([
    data.email,
    data.phone,
    data.city,
    data.linkedin,
    data.github,
  ]);

  return (
    <div className="resume-content">
      <header className="resume-header">
        <div>
          <EditableText
            value={data.fullName}
            placeholder=""
            className="resume-name"
            onChange={(val) => safeEdit("fullName", val)}
          />
          <EditableText
            value={data.role}
            placeholder=""
            className="resume-role resume-role-uppercase"
            onChange={(val) => safeEdit("role", val)}
          />
        </div>
        <div className="resume-contact-row">
          {contacts.map((item, index) => (
            <span key={index} className="resume-contact-item">
              {item}
            </span>
          ))}
        </div>
      </header>

      <div className="resume-columns">
        <aside className="resume-left">
          <section className="resume-section">
            <div className="resume-section-title">Skills</div>
            <div className="resume-skill-grid">
              {clean(data.skills).map((skill, index) => (
                <EditableText
                  key={index}
                  value={skill}
                  placeholder=""
                  onChange={(val) => safeEdit(["skills", index], val)}
                />
              ))}
            </div>
          </section>

          <section className="resume-section">
            <div className="resume-section-title">Certifications</div>
            <ul className="resume-bullets">
              {clean(data.certifications).map((item, index) => (
                <li key={index}>
                  <EditableText
                    value={item}
                    placeholder=""
                    onChange={(val) =>
                      safeEdit(["certifications", index], val)
                    }
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-section">
            <div className="resume-section-title">Languages</div>
            <ul className="resume-bullets">
              {clean(data.languages).map((item, index) => (
                <li key={index}>
                  <EditableText
                    value={item}
                    placeholder=""
                    onChange={(val) => safeEdit(["languages", index], val)}
                  />
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="resume-right">
          <section className="resume-section">
            <div className="resume-section-title">Professional Summary</div>
            <EditableText
              as="p"
              value={data.summary}
              placeholder=""
              className="resume-summary resume-summary-3"
              onChange={(val) => safeEdit("summary", val)}
            />
          </section>

          <section className="resume-section">
            <div className="resume-section-title">Experience</div>
            {data.experience.slice(0, 2).map((exp, index) => (
              <div key={index} className="resume-item">
                <div className="resume-item-header">
                  <EditableText
                    value={exp.role}
                    placeholder=""
                    className="resume-item-title"
                    onChange={(val) =>
                      safeEdit(["experience", index, "role"], val)
                    }
                  />
                  <EditableText
                    value={exp.period}
                    placeholder=""
                    className="resume-item-meta"
                    onChange={(val) =>
                      safeEdit(["experience", index, "period"], val)
                    }
                  />
                </div>
                <div className="resume-item-sub resume-meta-line">
                  <EditableText
                    value={exp.company}
                    placeholder=""
                    onChange={(val) =>
                      safeEdit(["experience", index, "company"], val)
                    }
                  />
                  <span className="resume-sep">|</span>
                  <EditableText
                    value={exp.location}
                    placeholder=""
                    onChange={(val) =>
                      safeEdit(["experience", index, "location"], val)
                    }
                  />
                  <span className="resume-sep">|</span>
                  <EditableText
                    value={exp.employmentType}
                    placeholder=""
                    onChange={(val) =>
                      safeEdit(["experience", index, "employmentType"], val)
                    }
                  />
                </div>
                <div className="resume-tech">
                  {clean(exp.techStack).map((tech, t) => (
                    <span key={t} className="resume-chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="resume-bullets">
                  {clean(exp.bullets).slice(0, 4).map((bullet, i) => (
                    <li key={i}>
                      <EditableText
                        value={bullet}
                        placeholder=""
                        className="resume-bullet"
                        onChange={(val) =>
                          safeEdit(["experience", index, "bullets", i], val)
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="resume-section">
            <div className="resume-section-title">Projects</div>
            {data.projects.slice(0, 2).map((proj, index) => (
              <div key={index} className="resume-item">
                <div className="resume-item-header">
                  <EditableText
                    value={proj.title}
                    placeholder=""
                    className="resume-item-title"
                    onChange={(val) =>
                      safeEdit(["projects", index, "title"], val)
                    }
                  />
                </div>
                <div className="resume-tech">
                  {clean(proj.techStack).map((tech, t) => (
                    <span key={t} className="resume-chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="resume-links">
                  {proj.githubLink && (
                    <span className="resume-link">GitHub</span>
                  )}
                  {proj.liveLink && <span className="resume-link">Live</span>}
                </div>
                <ul className="resume-bullets">
                  {clean(proj.bullets).slice(0, 4).map((bullet, i) => (
                    <li key={i}>
                      <EditableText
                        value={bullet}
                        placeholder=""
                        className="resume-bullet"
                        onChange={(val) =>
                          safeEdit(["projects", index, "bullets", i], val)
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="resume-section">
            <div className="resume-section-title">Education</div>
            {data.education.slice(0, 3).map((edu, index) => (
              <div key={index} className="resume-item">
                <div className="resume-item-header">
                  <EditableText
                    value={edu.degree}
                    placeholder=""
                    className="resume-item-title"
                    onChange={(val) =>
                      safeEdit(["education", index, "degree"], val)
                    }
                  />
                  <EditableText
                    value={edu.year}
                    placeholder=""
                    className="resume-item-meta"
                    onChange={(val) =>
                      safeEdit(["education", index, "year"], val)
                    }
                  />
                </div>
                <div className="resume-item-sub">
                  <EditableText
                    value={edu.college}
                    placeholder=""
                    onChange={(val) =>
                      safeEdit(["education", index, "college"], val)
                    }
                  />
                  {edu.grade && <span className="resume-sep">|</span>}
                  {edu.grade && (
                    <EditableText
                      value={edu.grade}
                      placeholder=""
                      onChange={(val) =>
                        safeEdit(["education", index, "grade"], val)
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
