import EditableText from "../components/EditableText.jsx";

const clean = (arr) => arr.filter((item) => item && item.trim().length > 0);

export default function TemplateCorporate({ data, onEdit }) {
  const safeEdit = (path, value) => onEdit && onEdit(path, value);
  const skills = clean(data.skills);
  const certifications = clean(data.certifications);
  const languages = clean(data.languages);
  const contacts = clean([
    data.email,
    data.phone,
    data.city,
    data.linkedin,
    data.github,
  ]);

  return (
    <div className="resume-corporate">
      <aside className="resume-corporate-sidebar">
        <EditableText
          value={data.fullName}
          placeholder=""
          className="resume-corporate-name"
          onChange={(val) => safeEdit("fullName", val)}
        />
        <EditableText
          value={data.role}
          placeholder=""
          className="resume-corporate-role resume-role-uppercase"
          onChange={(val) => safeEdit("role", val)}
        />
        <div className="resume-corporate-section resume-section">
          <div className="resume-section-title">Contact</div>
          <div className="resume-contact-vertical">
            {contacts.map((item, index) => (
              <EditableText
                key={index}
                value={item}
                placeholder=""
                onChange={(val) => {
                  const fields = [
                    "email",
                    "phone",
                    "city",
                    "linkedin",
                    "github",
                  ];
                  safeEdit(fields[index], val);
                }}
              />
            ))}
          </div>
        </div>
        <div className="resume-corporate-section resume-section">
          <div className="resume-section-title">Skills</div>
          <div className="resume-skill-grid">
            {(skills.length ? skills : [""]).map((skill, index) => (
              <EditableText
                key={index}
                value={skill}
                placeholder=""
                onChange={(val) => safeEdit(["skills", index], val)}
              />
            ))}
          </div>
        </div>
        <div className="resume-corporate-section resume-section">
          <div className="resume-section-title">Achievements</div>
          <ul>
            {(certifications.length ? certifications : [""]).map(
              (item, index) => (
                <li key={index}>
                  <EditableText
                    value={item}
                    placeholder=""
                    onChange={(val) =>
                      safeEdit(["certifications", index], val)
                    }
                  />
                </li>
              )
            )}
          </ul>
        </div>
        <div className="resume-corporate-section resume-section">
          <div className="resume-section-title">Languages</div>
          <ul>
            {(languages.length ? languages : [""]).map((item, index) => (
              <li key={index}>
                <EditableText
                  value={item}
                  placeholder=""
                  onChange={(val) => safeEdit(["languages", index], val)}
                />
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="resume-corporate-main">
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
              <EditableText
                value={exp.company}
                placeholder=""
                className="resume-item-sub"
                onChange={(val) =>
                  safeEdit(["experience", index, "company"], val)
                }
              />
              <ul>
                {exp.bullets.slice(0, 4).map((bullet, i) => (
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
              <ul>
                {proj.bullets.slice(0, 4).map((bullet, i) => (
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
          {data.education.map((edu, index) => (
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
              <EditableText
                value={edu.college}
                placeholder=""
                className="resume-item-sub"
                onChange={(val) =>
                  safeEdit(["education", index, "college"], val)
                }
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
