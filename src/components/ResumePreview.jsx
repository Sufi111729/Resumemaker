import { forwardRef, useMemo, useRef } from "react";
import TemplateBalanced from "../templates/TemplateBalanced.jsx";
import TemplateCorporate from "../templates/TemplateCorporate.jsx";
import useAutoFitA4 from "./useAutoFitA4.js";

const templateMap = {
  balanced: TemplateBalanced,
  corporate: TemplateCorporate,
};

const safeArray = (value) => (Array.isArray(value) ? value : []);

const normalizeData = (data) => ({
  ...data,
  skills: safeArray(data.skills).slice(0, 12),
  certifications: safeArray(data.certifications).slice(0, 5),
  languages: safeArray(data.languages).slice(0, 4),
  experience: safeArray(data.experience).slice(0, 2).map((exp) => ({
    ...exp,
    techStack: safeArray(exp.techStack).slice(0, 6),
    bullets: safeArray(exp.bullets).slice(0, 4),
  })),
  projects: safeArray(data.projects).slice(0, 2).map((proj) => ({
    ...proj,
    techStack: safeArray(proj.techStack).slice(0, 6),
    bullets: safeArray(proj.bullets).slice(0, 4),
  })),
  education: safeArray(data.education).slice(0, 3),
});

const ResumePreview = forwardRef(function ResumePreview(
  { data, template, onEdit },
  ref
) {
  const innerRef = useRef(null);
  const Template = templateMap[template] || TemplateBalanced;
  const viewData = useMemo(() => normalizeData(data), [data]);

  useAutoFitA4(ref, innerRef, [viewData, template]);

  return (
    <div ref={ref} className="resume-a4">
      <div ref={innerRef} className="resume-inner">
        <Template data={viewData} onEdit={onEdit} />
      </div>
      <div className="resume-footer">Generated via SufiCV</div>
    </div>
  );
});

export default ResumePreview;
