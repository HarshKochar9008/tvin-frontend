import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import StarBorder from "./components/StarBorder";
import NoteEditorModal from "./components/NoteEditorModal";
import NotesList from "./components/NotesList";
import { Search, Plus, ChevronLeft } from "lucide-react";

// const API = "http://localhost:5000/api/notes";
const API = "/api/notes";


function App() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tab, setTab] = useState("all");
  const [showEditor, setShowEditor] = useState(false);
  const saveTimeout = useRef(null);
  const [error, setError] = useState("");
  const [showTitlePrompt, setShowTitlePrompt] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [search, setSearch] = useState("");
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    if (!selected) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      setError("");
      if (!title || !content) {
        setError("Both title and content are required.");
        return;
      }
      try {
        if (selected) {
          const res = await axios.put(`${API}/${selected._id}`, { title, content });
          setNotes(notes => notes.map(n => (n._id === res.data._id ? res.data : n)));
          setSelected(res.data);
        } else {
          const res = await axios.post(API, { title, content });
          setNotes(prevNotes => [res.data, ...prevNotes]);
          setSelected(res.data);
        }
        setShowEditor(false);
      } catch (err) {
        setError(err?.response?.data?.error || err.message || "Failed to save note.");
      }
    }, 1200);
    // Cleanup function to clear timeout if dependencies change
    return () => clearTimeout(saveTimeout.current);
  }, [title, content, selected]);
  const handleDelete = async id => {
    setError("");
    try {
      await axios.delete(`${API}/${id}`);
      setNotes(notes => notes.filter(n => n._id !== id));
      if (selected && selected._id === id) {
        setSelected(null);
        setTitle("");
        setContent("");
        setShowEditor(false);
        // Removed: setUnsaved(false);
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Failed to delete note.");
    }
  };
  const handleNew = () => {
    setNewNoteTitle("");
    setShowTitlePrompt(true);
  };
  const handleTitlePromptSubmit = () => {
    if (!newNoteTitle.trim()) return;
    setSelected(null);
    setTitle(newNoteTitle);
    setContent("");
    setShowEditor(true);
    setShowTitlePrompt(false);
    // Removed: setUnsaved(false);
  };
  const handlePin = async (id, pinned) => {
    setError("");
    try {
      const res = await axios.patch(`${API}/${id}/pin`, { pinned });
      setNotes(notes => notes.map(n => (n._id === id ? { ...n, pinned: res.data.pinned } : n)));
      if (selected && selected._id === id) {
        setSelected({ ...selected, pinned: res.data.pinned });
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Failed to pin/unpin note.");
    }
  };

  // Selection handlers
  const handleSelect = note => {
    setSelected(note);
    setTitle(note.title);
    setContent(note.content);
    setShowEditor(true);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
  };
  const handleSelectNote = id => {
    setSelectedNotes(sel => sel.includes(id) ? sel.filter(nid => nid !== id) : [...sel, id]);
  };
  const allSelected = notes.length > 0 && selectedNotes.length === notes.length;
  const handleSelectAll = () => {
    if (allSelected) setSelectedNotes([]);
    else setSelectedNotes(notes.map(n => n._id));
  };
  // Bulk delete
  const handleBulkDelete = async () => {
    for (const id of selectedNotes) {
      await handleDelete(id);
    }
    setSelectedNotes([]);
  };

  // Filter notes by tab
  const displayedNotes = tab === "all"
    ? notes
    : notes.filter(n => n.pinned); // Only show pinned notes in important section

  if (showDashboard) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated blurred circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 opacity-30 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 opacity-30 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        {/* Floating math symbols and note icon */}
        <span className="absolute left-1/4 top-20 text-6xl text-white/30 filter blur-sm animate-float-slow" style={{animationDelay: '0.2s'}}>&#8721;</span> {/* ∑ */}
        <span className="absolute right-1/4 top-32 text-5xl text-white/25 filter blur-sm animate-float-medium" style={{animationDelay: '0.6s'}}>&#960;</span> {/* π */}
        <span className="absolute left-1/3 bottom-24 text-7xl text-white/20 filter blur animate-float-fast" style={{animationDelay: '1.2s'}}>&#8730;</span> {/* √ */}
        <span className="absolute right-1/3 bottom-40 text-6xl text-white/25 filter blur animate-float-medium" style={{animationDelay: '0.8s'}}>&#8734;</span> {/* ∞ */}
        <span className="absolute left-10 top-1/2 text-5xl text-white/20 filter blur animate-float-slow" style={{animationDelay: '1.5s'}}>&#8747;</span> {/* ∫ */}
        {/* Note SVG icon */}
        <span className="absolute right-16 top-1/3 animate-float-fast" style={{opacity: 0.18}}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="10" width="44" height="40" rx="6" fill="#fff" fillOpacity="0.7"/>
            <rect x="14" y="18" width="32" height="4" rx="2" fill="#6366f1" fillOpacity="0.7"/>
            <rect x="14" y="28" width="24" height="4" rx="2" fill="#6366f1" fillOpacity="0.9"/>
            <rect x="14" y="38" width="18" height="4" rx="2" fill="#6366f1" fillOpacity="0.3"/>
          </svg>
        </span>
        <div className="z-10 text-center">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-6 animate-fade-in">TVIN</h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in delay-200">Your LaTeX Notes Dashboard</p>
          <StarBorder
            as="button"
            color="#38bdf8"
            speed="5s"
            className="mx-auto mt-2"
            onClick={() => setShowDashboard(false)}
            aria-label="Enter notes app"
          >
            Get Started
          </StarBorder>
        </div>
        {/* Simple fade-in and bounce animations, plus float keyframes */}
        <style>{`
          @keyframes fade-in { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
          .animate-fade-in { animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both; }
          .delay-200 { animation-delay: 0.2s; }
          @keyframes float-slow { 0% { transform: translateY(0px); } 50% { transform: translateY(-30px); } 100% { transform: translateY(0px); } }
          @keyframes float-medium { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
          @keyframes float-fast { 0% { transform: translateY(0px); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0px); } }
          .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
          .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
          .animate-float-fast { animation: float-fast 3.5s ease-in-out infinite; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-x-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-700 opacity-20 rounded-full filter blur-3xl animate-pulse -z-10" style={{animationDuration: '7s'}}></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-700 opacity-20 rounded-full filter blur-3xl animate-pulse -z-10" style={{animationDuration: '9s'}}></div>
      <div className="flex items-center justify-between px-8 py-4 bg-gray-900/80 rounded-b-3xl shadow-lg mb-8 mx-4 mt-2">
      <ChevronLeft color="white" size={24} className="cursor-pointer hover:text-blue-400 transition-all" onClick={() => setShowDashboard(true)} />
      
        <div className="flex gap-4">
          <button
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${tab === "all" ? "bg-blue-600 text-white shadow" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            onClick={() => setTab("all")}
          >
            All Notes
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${tab === "important" ? "bg-blue-600 text-white shadow" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            onClick={() => setTab("important")}
          >
            Important
          </button>
        </div>
        <div className="flex items-center gap-6">
          {/* Search Notes input */}
          <div className="relative flex items-center bg-gray-800/80 rounded-full px-4 py-2 shadow-lg">
          <Search color="white"/>
          <input
            className="px-4 py-2 rounded-xl text-gray-100  focus:outline-none  placeholder-gray-300 shadow-inner bg-transparent w-64"
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search notes"
          />
          </div>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl shadow-lg hover:bg-blue-700 transition-all"
            onClick={handleNew}
            aria-label="Add note"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        <NotesList
          notes={displayedNotes} // Pass filtered notes
          onSelect={handleSelect}
          onDelete={handleDelete}
          onPin={handlePin}
          selectedId={selected?._id}
          tab={tab}
          selectedNotes={selectedNotes}
          onSelectNote={handleSelectNote}
          onSelectAll={handleSelectAll}
          onBulkDelete={handleBulkDelete}
          allSelected={allSelected}
        />
      </div>
      <NoteEditorModal
        open={showEditor}
        onClose={() => setShowEditor(false)}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        onSave={() => {
          setError("");
          if (!title || !content) {
            setError("Both title and content are required.");
            return;
          }
          axios.post(API, { title, content }).then(res => {
            setNotes([res.data, ...notes]);
            setSelected(res.data);
            setShowEditor(false);
          }).catch(err => {
            setError(err?.response?.data?.error || err.message || "Failed to save note.");
          });
        }}
        error={error}
        isUpdate={!!selected}
      />
      {showTitlePrompt && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col">
            <h2 className="text-xl font-bold text-blue-300 mb-4 text-center">Enter a Title for Your Note</h2>
            <input
              className="border border-gray-700 bg-gray-900 text-gray-100 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 shadow-inner mb-4 text-lg font-semibold"
              placeholder="Note Title"
              value={newNoteTitle}
              onChange={e => setNewNoteTitle(e.target.value)}
              aria-label="Note title"
              autoFocus
            />
            <div className="flex justify-end gap-4 mt-2">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all font-semibold text-md"
                onClick={handleTitlePromptSubmit}
                disabled={!newNoteTitle.trim()}
              >
                Next
              </button>
              <button
                className="bg-gray-700 text-gray-200 px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition-all font-semibold text-md"
                onClick={() => setShowTitlePrompt(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
