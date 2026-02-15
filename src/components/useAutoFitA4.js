import { useLayoutEffect, useState } from "react";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function useAutoFitA4(wrapperRef, contentRef, deps = []) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const measure = () => {
      content.style.setProperty("--fitScale", "1");
      const pageHeight = wrapper.clientHeight;
      const contentHeight = content.scrollHeight;
      if (!pageHeight || !contentHeight) return;

      let nextScale = 1;
      if (contentHeight > pageHeight) {
        nextScale = clamp(pageHeight / contentHeight, 0.88, 1);
      } else if (contentHeight < pageHeight * 0.82) {
        nextScale = clamp(pageHeight / contentHeight, 1, 1.06);
      }

      setScale(nextScale);
      content.style.setProperty("--fitScale", String(nextScale));
    };

    const raf = requestAnimationFrame(measure);
    const timeout = setTimeout(measure, 50);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, deps);

  return scale;
}
