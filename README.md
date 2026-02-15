# Resumemaker (SufiCV)

A modern, one‑page A4 Resume Builder + Portfolio Generator built with React and Vite. It enforces strict single‑page layout, auto‑fits content, and provides a clean wizard experience for users.

## Features
- Strict **one‑page A4** resume layout (210mm × 297mm)
- **Auto‑fit scaling** to avoid overflow
- **Multi‑step wizard** (Fill → Template → Pay → Download)
- **Direct UPI payment** flow (no backend)
- **Editable live preview**
- **Portfolio link** generator
- Mobile‑responsive UI

## Tech Stack
- React (Vite)
- Tailwind CSS
- react-to-print
- LocalStorage (no backend)

## Folder Structure
```
src
  App.jsx
  index.css
  main.jsx
  components
    BulletInput.jsx
    ChipInput.jsx
    DarkModeToggle.jsx
    EditableText.jsx
    PaymentStep.jsx
    PortfolioPage.jsx
    ResumeForm.jsx
    ResumePreview.jsx
    ShareLink.jsx
    Stepper.jsx
    TemplateCard.jsx
    Toast.jsx
    fontUtils.js
    resumeData.js
    useAutoFitA4.js
  templates
    TemplateBalanced.jsx
    TemplateCorporate.jsx
```

## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Payment (UPI)
Configured for direct UPI payment (frontend‑only). Update values in `src/App.jsx`:
- `UPI_ID`
- `UPI_LINK`
- `AMOUNT_LABEL`

## Notes
- PDF download unlocks after confirming payment (10‑minute token).
- All data is stored locally in the browser.

## License
MIT
