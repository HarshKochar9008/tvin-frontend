# Tvin Notes App
Tvin a full-stack Notes application with advanced LaTeX support for math and chemistry, live equation rendering, and a custom equation toolbar.

---

## Features

- **Create, Read, Update, Delete (CRUD) notes**
- **Live LaTeX Rendering:** Instantly preview math and chemical equations as you type
- **Custom Equation Toolbar:**
  - Mathematical symbols (∑, ∫, √, π, matrices, limits, fractions, Greek letters, etc.)
  - Chemical symbols (H₂O, CO₂, reaction & equilibrium arrows, Δ, state symbols, etc.)
  - Click to auto-insert LaTeX code into the editor
- **Pin notes** for quick access
- **Responsive, modern UI**

---

## Technology Stack

- **Frontend:** React.js, Tailwind CSS, [KaTeX](https://katex.org/) via `react-katex`
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```
MONGO_URL=your_mongodb_connection_string
```

Start the backend server:
```bash
npm start
```
The backend runs on [http://localhost:5000](http://localhost:5000)

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm start
```
The frontend runs on [http://localhost:3000](http://localhost:3000)

---

## Usage

- Create a new note, type LaTeX in the editor, and see it rendered live.
- Use the toolbar to insert math/chemistry symbols or formatting.
- Pin important notes for quick access.
- All notes are saved in MongoDB via the backend API.

---

## Folder Structure

```
Asky/
  backend/      # Express.js API & MongoDB models
  frontend/     # React.js app with LaTeX editor and toolbar
```

---

## Scripts

### Backend
- `npm start` — Start backend server

### Frontend
- `npm start` — Start frontend dev server
- `npm run build` — Build frontend for production

---

## License

MIT
