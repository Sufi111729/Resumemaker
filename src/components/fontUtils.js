export function computeFontSize(data) {
  const textLength =
    data.summary.length +
    data.skills.join(" ").length +
    data.certifications.join(" ").length +
    data.languages.join(" ").length +
    data.experience
      .map((exp) => exp.bullets.join(" ") + exp.company + exp.role)
      .join(" ").length +
    data.projects.map((p) => p.bullets.join(" ") + p.title).join(" ")
      .length +
    data.education.map((e) => e.degree + e.college).join(" ").length;

  if (textLength > 900) return 12;
  return 13;
}
