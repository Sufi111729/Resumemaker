export default function EditableText({
  value,
  placeholder,
  className,
  onChange,
  as = "span",
}) {
  const Component = as;

  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      className={`editable ${className || ""}`}
      data-placeholder={placeholder}
      onBlur={(e) => onChange(e.currentTarget.textContent || "")}
    >
      {value}
    </Component>
  );
}
