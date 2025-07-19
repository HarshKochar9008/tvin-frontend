import React, { useRef } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import Toolbar from "./Toolbar";

export default function LatexEditor({ value, setValue }) {
  const textareaRef = useRef();
  // onInsert now supports (latex, isFormatting)
  const handleInsert = (latex, isFormatting = false) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (isFormatting) {
      // For formatting, wrap selected text or place cursor inside braces
      const selected = value.substring(start, end);
      let insertText, cursorPos;
      if (selected) {
        // e.g. \textbf{selected}
        insertText = latex.replace('{}', `{${selected}}`);
        cursorPos = start + insertText.length;
      } else {
        // e.g. \textbf{|}
        insertText = latex;
        cursorPos = start + latex.indexOf('{}') + 1;
      }
      const newValue = value.substring(0, start) + insertText + value.substring(end);
      setValue(newValue);
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = cursorPos;
      }, 0);
    } else {
      // Normal insert (symbols, files, links)
      const newValue = value.substring(0, start) + latex + value.substring(end);
      setValue(newValue);
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + latex.length;
      }, 0);
    }
  };
  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-1/3 w-96 h-48 bg-blue-700 opacity-10 rounded-full filter blur-2xl animate-pulse -z-10" style={{animationDuration: '8s'}}></div>
      <Toolbar onInsert={handleInsert} />
      <div className="flex flex-col md:flex-row gap-6 w-full h-full mt-4">
        <textarea
          ref={textareaRef}
          className="border border-gray-700 bg-gray-900 text-gray-100 p-4 w-full md:w-1/2 h-[450px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none shadow-inner text-lg font-mono transition-all"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type LaTeX here..."
          aria-label="LaTeX input area"
          tabIndex={0}
        />
        <div className="border border-gray-700 bg-gray-800 text-white p-4 w-full md:w-1/2 h-[450px] rounded-lg overflow-auto shadow-inner flex items-center text-lg font-mono transition-all">
          {/* Error handling for LaTeX rendering */}
          <BlockMath math={value} errorColor="#cc0000" renderError={err => <span className="text-red-400 font-semibold">{err.name}: {err.message}</span>} />
        </div>
      </div>
    </div>
  );
} 