import React, { useState } from "react";
import { Pin, PinOff, Trash2, Square, CheckSquare } from "lucide-react";

export default function NotesList({ notes, onSelect, onDelete, onPin, selectedId, tab, selectedNotes = [], onSelectNote, onSelectAll, onBulkDelete, allSelected }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = (e, id, title) => {
    e.stopPropagation();
    setDeleteTarget({ id, title });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const cancelDelete = () => setDeleteTarget(null);

  const handlePin = (e, id, pinned) => {
    e.stopPropagation();
    onPin(id, !pinned);
  };

  const formatDate = dateStr => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <>
      <div className="w-max overflow-x-auto">
        {(notes.length > 0 || tab === 'all') && (
          <div className="flex flex-col gap-2 px-4 py-6 w-full min-h-[300px] bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700">
            {/* Bulk actions and select all */}
            <div className="flex items-center gap-4 mb-4">
              <button
                className="flex items-center gap-2 text-gray-200 hover:text-blue-400 focus:outline-none"
                onClick={onSelectAll}
                aria-label={allSelected ? "Deselect all notes" : "Select all notes"}
              >
                {allSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                <span className="text-sm">Select All</span>
              </button>
              <button
                className="flex items-center gap-1 text-red-400 hover:text-red-600 focus:outline-none disabled:opacity-40"
                onClick={onBulkDelete}
                disabled={selectedNotes.length === 0}
                aria-label="Delete selected notes"
              >
                <Trash2 size={20} />
                <span className="text-sm">Delete</span>
              </button>
              {selectedNotes.length > 0 && (
                <span className="text-xs text-gray-400 ml-2">{selectedNotes.length} selected</span>
              )}
            </div>
            <div className="flex gap-6">
              {notes.length === 0 && tab === 'all' && (
                <div className="text-center text-gray-400 py-16 text-lg">No notes found</div>
              )}
              {notes.map(note => (
                <div
                  key={note._id}
                  className={`relative flex flex-col w-[300px] p-6 rounded-3xl shadow-2xl border border-white/20 transition-all cursor-pointer bg-white/20 backdrop-blur-lg hover:bg-blue-200/10 group min-h-[200px] ${selectedId === note._id ? 'ring-2 ring-blue-400 border-blue-400' : ''}`}
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(107, 107, 107, 0.62) 1px, transparent 1px, transparent 32px)',
                  }}
                  onClick={() => onSelect(note)}
                  tabIndex={0}
                  aria-selected={selectedId === note._id}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') onSelect(note);
                  }}
                >
                  {/* Checkbox for selection */}
                  <button
                    className="absolute left-3 top-2 z-10  bg-gray-900/60 rounded focus:outline-none"
                    onClick={e => { e.stopPropagation(); onSelectNote(note._id); }}
                    aria-label={selectedNotes.includes(note._id) ? "Deselect note" : "Select note"}
                  >
                    {selectedNotes.includes(note._id) ? <CheckSquare color={"gray"} size={20} /> : <Square color={"gray"} size={20} />}
                  </button>
                  <div className="absolute left-1 top-8 h-7 w-1 rounded bg-blue-500/80" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-white truncate" title={note.title}>
                      {note.title}
                    </span>
                    <span className="ml-1 w-3 h-3 rounded-full bg-gray-400 inline-block" />
                  </div>
                  <div className="text-xs text-blue-200 mb-2">{formatDate(note.updatedAt || note.createdAt)}</div>

                  <div className="flex items-center gap-4 mt-auto">
                    <button
                      className={`text-yellow-400 ${note.pinned ? '' : 'opacity-60'} hover:opacity-100 transition-opacity p-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                      title={note.pinned ? 'Unpin note' : 'Pin note'}
                      tabIndex={-1}
                      onClick={e => handlePin(e, note._id, note.pinned)}
                    >
                      {note.pinned ? <Pin fill="currentColor" size={18} /> : <PinOff size={20} />}
                    </button>
                    <button
                      className="text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 rounded hover:bg-red-100/10 p-1"
                      aria-label={`Delete note ${note.title}`}
                      onClick={e => handleDelete(e, note._id, note.title)}
                      tabIndex={-1}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col">
            <div className="text-white text-lg font-semibold mb-4 text-center">
              Delete note: "{deleteTarget.title}"?
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition-all font-semibold text-lg"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-700 text-gray-200 px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition-all font-semibold text-lg"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
