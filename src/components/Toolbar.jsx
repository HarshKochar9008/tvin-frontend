import React, { useRef } from "react";

const symbolGroups = [
  {
    heading: "Math Symbols",
    symbols: [
      { label: "∑", latex: "\\sum" },
      { label: "∫", latex: "\\int" },
      { label: "√", latex: "\\sqrt{}" },
      { label: "π", latex: "\\pi" },
      { label: "lim", latex: "\\lim_{x \\to 0}" },
      { label: "→", latex: "\\to" },
      { label: "⇌", latex: "\\rightleftharpoons" },
      { label: "∞", latex: "\\infty" },
      { label: "±", latex: "\\pm" },
      { label: "≠", latex: "\\neq" },
      { label: "≤", latex: "\\leq" },
      { label: "≥", latex: "\\geq" },
      { label: "≈", latex: "\\approx" },
      { label: "→", latex: "\\rightarrow" },
      { label: "←", latex: "\\leftarrow" },
      { label: "⇔", latex: "\\Leftrightarrow" },
      { label: "α", latex: "\\alpha" },
      { label: "β", latex: "\\beta" },
      { label: "γ", latex: "\\gamma" },
      { label: "θ", latex: "\\theta" },
      { label: "μ", latex: "\\mu" },
      { label: "Σ", latex: "\\Sigma" },
      { label: "Δ", latex: "\\Delta" },
      { label: "Ω", latex: "\\Omega" },
      { label: "Fraction", latex: "\\frac{}{}" },
      { label: "Superscript", latex: "^{}" },
      { label: "Subscript", latex: "_{}" },
      { label: "Matrix 2x2", latex: "\\begin{bmatrix} a & b \\ c & d \\end{bmatrix}" },
      { label: "Matrix 3x3", latex: "\\begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \\end{bmatrix}" },
    ],
  },
  {
    heading: "Chemistry Symbols",
    symbols: [
      { label: "H₂O", latex: "H_2O" },
      { label: "CO₂", latex: "CO_2" },
      { label: "O₂", latex: "O_2" },
      { label: "N₂", latex: "N_2" },
      { label: "→ (rxn)", latex: "\\rightarrow" },
      { label: "⇌ (eq)", latex: "\\rightleftharpoons" },
      { label: "Δ (heat)", latex: "\\Delta" },
      { label: "Catalyst", latex: "\\xrightarrow{\\text{cat.}}" },
      { label: "Precipitate", latex: "\\downarrow" },
      { label: "Gas", latex: "\\uparrow" },
      { label: "aq", latex: "_{(aq)}" },
      { label: "s", latex: "_{(s)}" },
      { label: "l", latex: "_{(l)}" },
      { label: "g", latex: "_{(g)}" },
    ],
  },
];

export default function Toolbar({ onInsert }) {
  const fileInputRef = useRef();

  const handleBold = () => onInsert("\\textbf{}", true);
  const handleItalic = () => onInsert("\\textit{}", true);
  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) onInsert(`\\href{${url}}{}`);
  };
  const handleFile = e => {
    if (e.target.files && e.target.files[0]) {
      // For now, just insert the file name. Real upload would need backend.
      onInsert(`\\texttt{[file: ${e.target.files[0].name}]}`);
      e.target.value = null;
    }
  };

  return (
    <div className="mb-6 flex flex-row gap-6 items-center max-h-80 px-2 py-3 bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700 sticky top-0 z-30">
      {/* Formatting and attachment actions */}
      <div className="flex flex-row gap-2 items-center">
        <button type="button" title="Bold (Ctrl+B)" aria-label="Bold" onClick={handleBold} className="px-3 py-2 rounded bg-gray-900 text-gray-100 border border-gray-700 hover:bg-blue-800/70 hover:text-cyan-300 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400" tabIndex={0}>B</button>
        <button type="button" title="Italic (Ctrl+I)" aria-label="Italic" onClick={handleItalic} className="px-3 py-2 rounded bg-gray-900 text-gray-100 border border-gray-700 hover:bg-blue-800/70 hover:text-cyan-300 italic text-lg focus:outline-none focus:ring-2 focus:ring-blue-400" tabIndex={0}>I</button>
        <button type="button" title="Insert Link (Ctrl+K)" aria-label="Insert Link" onClick={handleLink} className="px-3 py-2 rounded bg-gray-900 text-gray-100 border border-gray-700 hover:bg-blue-800/70 hover:text-cyan-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400" tabIndex={0}>🔗</button>
        <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFile} aria-label="Attach file" />
      </div>
      {/* Symbol dropdowns */}
      <div className="flex flex-row gap-4 ml-6">
        {symbolGroups.map((group, idx) => (
          <div key={group.heading} className="relative group" tabIndex={0} aria-label={group.heading + ' dropdown'}>
            <button type="button" className="px-4 py-2 rounded bg-gray-900 text-blue-200 border border-gray-700 hover:bg-blue-800/70 hover:text-cyan-300 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-400" aria-haspopup="true" aria-expanded="false" tabIndex={0} title={group.heading + ' symbols'}>
              {group.heading} ▼
            </button>
            <div className="absolute left-0 mt-2 z-20 hidden group-hover:block group-focus-within:block bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-2 min-w-[220px] max-h-64 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {group.symbols.map((sym, i) => (
                  <button
                    key={sym.label + sym.latex + i}
                    type="button"
                    onClick={() => onInsert(sym.latex)}
                    className="w-24 h-10 flex items-center justify-center border border-gray-700 bg-gray-800 text-gray-100 rounded-lg shadow hover:bg-blue-800/70 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 transition-all duration-150 text-base font-semibold select-none px-2"
                    title={sym.label}
                    aria-label={sym.label}
                    tabIndex={0}
                  >
                    <div className="w-full text-center whitespace-normal break-words leading-tight truncate">
                      {sym.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
