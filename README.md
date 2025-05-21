# 📊 Real-Time Census Progress Tracker

Track live progress of census operations with a tree-based UI.

## 🚀 Tech Stack

- Backend: Node.js, MongoDB, Socket.IO
- Frontend: HTML, Vanilla JS, D3.js (No SPA frameworks)

## 📦 Setup

1. Clone the repo.
2. `npm install`
3. Set up `.env` with MongoDB URI.
4. Insert sample census data.
5. Run with: `npm start`

## 🧪 Simulating Updates

The backend will mark incomplete nodes as completed every 5 seconds for demonstration.

## ❗ Assumptions

- Only one census selected at a time.
- The `census_data` collection is preloaded.

## ✅ Features

- Dropdown-based census selection.
- Live tree updates via WebSocket.
- Preserves UI state on update.

