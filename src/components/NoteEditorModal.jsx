import React from "react";
import LatexEditor from "./LatexEditor";
import{  X, Download } from "lucide-react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function NoteEditorModal({
  open,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  onSave,
  error,
  isUpdate
}) {
  const [editorMode, setEditorMode] = React.useState('math');
  if (!open) return null;

  // Download handler for LaTeX preview
  const handleDownload = async () => {
    try {
      const html2canvas = await import("html2canvas");

      const previewContainer = document.querySelector(".preview-area-for-download");

      if (!previewContainer) {
        alert("Preview container not found.");
        return;
      }

      // Wait for rendering (optional delay just to be safe)
      await new Promise(res => setTimeout(res, 300));

      const canvas = await html2canvas.default(previewContainer, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true
      });

      canvas.toBlob(blob => {
        if (!blob) {
          alert("Failed to generate image.");
          return;
        }

        const fileName =
          `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "note"}.png`;

        const link = document.createElement("a");
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, "image/png");

    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Try refreshing the page.");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#181A20] rounded-3xl shadow-2xl sm:px-2 py-2 w-full max-w-[1200px] h-[650px] relative flex flex-col border border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4 sm:gap-8 px-2 pt-2">
          <input
            className="bg-transparent border-0 border-b-2 border-gray-700 focus:border-blue-500 text-gray-100 placeholder-gray-500 py-2 px-2 flex-1 text-2xl font-semibold focus:outline-none transition-all min-w-0 rounded-lg"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            aria-label="Note title"
            style={{maxWidth: '60%'}}
          />
          <div className="flex gap-4 items-center mt-2 sm:mt-0">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2 rounded-lg font-semibold text-base shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onSave}
              disabled={!title || !content}
              aria-label={isUpdate ? 'Update note' : 'Create note'}
            >
              {isUpdate ? "Update" : "Create"}
            </button>
            <button
              className="flex items-center gap-2 text-blue-300 hover:text-blue-500 px-4 py-2 font-medium text-base bg-transparent rounded-lg focus:outline-none transition-colors"
              onClick={handleDownload}
              type="button"
              aria-label="Download LaTeX preview"
              disabled={!content}
            >
              <Download size={20} />
              <span>Download</span>
            </button>
            <button
              className="text-gray-400 hover:text-gray-200 px-4 py-2 font-medium text-base bg-transparent rounded-lg focus:outline-none transition-colors"
              onClick={onClose}
              type="button"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
          <button
            className="text-gray-500 hover:text-red-400 text-3xl font-light focus:outline-none transition-colors ml-0 sm:ml-2 self-start sm:self-auto"
            onClick={onClose}
            aria-label="Close editor"
            tabIndex={0}
          >
            <X/>
          </button>
        </div>
        <div className="border-b border-gray-700 mb-6"></div>
        {/* LaTeX Preview for Download - Hidden */}
        <div className="preview-area-for-download bg-white p-4 text-black rounded shadow" style={{ position: 'fixed', left: '-9999px', top: '-9999px' }}>
          {editorMode === 'text' ? (
            <div className="whitespace-pre-wrap text-black">
              {content}
            </div>
          ) : (
            <div className="space-y-4">
              {content.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return <div key={index} className="h-4"></div>;
                
                return (
                  <BlockMath 
                    key={index}
                    math={trimmedLine} 
                    errorColor="#cc0000" 
                  />
                );
              })}
            </div>
          )}
        </div>
        
        {/* Editor/content area */}
        <div className="flex-1 overflow-hidden">
          <LatexEditor value={content} setValue={setContent} onModeChange={setEditorMode} />
        </div>
        {error && (
          <div className="mb-2 mt-2 text-red-300 font-medium text-sm text-center" role="alert">{error}</div>
        )}
      </div>
    </div>
  );
} 