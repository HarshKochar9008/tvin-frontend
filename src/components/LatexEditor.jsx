import React, { useRef, useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import Toolbar from "./Toolbar";

export default function LatexEditor({ value, setValue, onModeChange }) {
  const textareaRef = useRef();
  const [mode, setMode] = useState('math'); // 'text' or 'math'
  
  // Notify parent component when mode changes
  React.useEffect(() => {
    if (onModeChange) {
      onModeChange(mode);
    }
  }, [mode, onModeChange]);
  
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
    <div className="relative w-full h-full flex flex-col">
      <div className="absolute top-0 left-1/3 w-96 h-48 bg-blue-700 opacity-10 rounded-full filter blur-2xl animate-pulse -z-10" style={{animationDuration: '8s'}}></div>
      <Toolbar onInsert={handleInsert} />
      
      {/* Mode Toggle Buttons */}
      <div className="flex gap-2 mt-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            mode === 'text' 
              ? "bg-blue-600 text-white shadow-lg" 
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setMode('text')}
        >
          Text Mode
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            mode === 'math' 
              ? "bg-blue-600 text-white shadow-lg" 
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setMode('math')}
        >
          Math Mode
        </button>
        <div className="flex items-center ml-4 text-gray-400 text-sm">
          <span className="mr-2">•</span>
          <span>
            {mode === 'text' 
              ? "Spaces behave naturally, text is wrapped automatically" 
              : "Raw KaTeX input, spaces are ignored (LaTeX style)"
            }
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1">
        <textarea
          ref={textareaRef}
          className="border border-gray-700 bg-gray-900 text-gray-100 p-4 w-full md:w-1/2 h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none shadow-inner text-lg font-mono transition-all overflow-auto"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={mode === 'text' ? "Type text here (will be rendered as text)..." : "Type LaTeX here..."}
          aria-label="LaTeX input area"
          tabIndex={0}
        />
        <div className="border border-gray-700 bg-gray-800 text-white p-4 w-full md:w-1/2 h-full rounded-lg overflow-auto shadow-inner text-lg font-mono transition-all flex flex-col justify-start">
          {mode === 'text' ? (
            <div className="whitespace-pre-wrap text-gray-100">
              {value}
            </div>
          ) : (
            <div className="space-y-4">
              {value.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return <div key={index} className="h-4"></div>;
                
                return (
                  <BlockMath 
                    key={index}
                    math={trimmedLine} 
                    errorColor="#cc0000" 
                    renderError={err => (
                      <span className="text-red-400 font-semibold">
                        {err.name}: {err.message}
                      </span>
                    )} 
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 