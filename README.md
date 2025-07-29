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

## LaTeX Symbol Examples

Below are some LaTeX syntax examples for math and chemistry, using only the symbols available in the toolbar:

### Math Symbols

| Symbol | LaTeX Syntax         | Example Usage                |
|--------|----------------------|------------------------------|
| ∑      | \sum                 | \sum_{i=1}^{n} i            |
| ∫      | \int                 | \int_0^1 x^2 dx              |
| √      | \sqrt{}              | \sqrt{a^2 + b^2}             |
| π      | \pi                  | \pi r^2                      |
| lim    | \lim_{x \to 0}       | \lim_{x \to 0} \frac{\sin x}{x} |
| →      | \to                  | f: X \to Y                   |
| ⇌      | \rightleftharpoons   | A \rightleftharpoons B       |
| ∞      | \infty               | \int_0^\infty e^{-x} dx      |
| ±      | \pm                  | x = 5 \pm 0.1                |
| ≠      | \neq                 | x \neq y                     |
| ≤      | \leq                 | x \leq y                     |
| ≥      | \geq                 | x \geq y                     |
| ≈      | \approx              | \pi \approx 3.14             |
| →      | \rightarrow          | A \rightarrow B              |
| ←      | \leftarrow           | B \leftarrow A               |
| ⇔      | \Leftrightarrow      | A \Leftrightarrow B          |
| α      | \alpha               | \alpha + \beta               |
| β      | \beta                | \alpha + \beta               |
| γ      | \gamma               | \gamma^2                     |
| θ      | \theta               | \theta = 90^\circ            |
| μ      | \mu                  | \mu = 0.01                   |
| Σ      | \Sigma               | \Sigma_{i=1}^n x_i           |
| Δ      | \Delta               | \Delta x                     |
| Ω      | \Omega               | \Omega = 2\pi                |
| Fraction | \frac{}{}          | \frac{a}{b}                  |
| Superscript | ^{}             | x^{2}                        |
| Subscript | _{}               | x_{i}                        |
| Matrix 2x2 | \begin{bmatrix} a & b \\ c & d \end{bmatrix} | \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} |
| Matrix 3x3 | \begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix} | \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix} |

### Chemistry Symbols

| Symbol      | LaTeX Syntax         | Example Usage                |
|-------------|----------------------|------------------------------|
| H₂O         | H_2O                 | H_2O                         |
| CO₂         | CO_2                 | CO_2                         |
| O₂          | O_2                  | O_2                          |
| N₂          | N_2                  | N_2                          |
| → (rxn)     | \rightarrow          | H_2 + O_2 \rightarrow H_2O   |
| ⇌ (eq)      | \rightleftharpoons   | N_2 + 3H_2 \rightleftharpoons 2NH_3 |
| Δ (heat)    | \Delta               | \Delta H                     |
| Catalyst    | \xrightarrow{\text{cat.}} | H_2O_2 \xrightarrow{\text{MnO}_2} H_2O + O_2 |
| Precipitate | \downarrow           | AgCl \downarrow              |
| Gas         | \uparrow             | H_2 \uparrow                 |
| aq          | _{(aq)}              | NaCl_{(aq)}                  |
| s           | _{(s)}               | AgCl_{(s)}                   |
| l           | _{(l)}               | H_2O_{(l)}                   |
| g           | _{(g)}               | O_2_{(g)}                    |

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
