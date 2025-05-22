# 📊 Real-Time Census Progress Tracker

A real-time web application that visualizes hierarchical census data using D3.js. Users can select a census type (e.g., Income or Caste), and the tree structure updates dynamically based on the selection. Built using Node.js, Express, Socket.IO, and vanilla JavaScript with D3.js.

---

## 🚀 Features

- 📡 Real-time data updates via WebSockets (Socket.IO)
- 🌳 Dynamic tree visualization using D3.js
- 🎯 Census category selection via dropdown
- 🧩 Modular and clean architecture
- 🔄 Automatically updates the tree based on selection
- ❌ No tree is shown until a selection is made

---

## 🧰 Tech Stack

**Frontend:**

- HTML5
- CSS3
- Vanilla JavaScript
- [D3.js v7](https://d3js.org/)
- [Socket.IO Client](https://socket.io/)

**Backend:**

- Node.js
- Express.js
- [Socket.IO Server](https://socket.io/)

---

## 📁 Project Structure

census-tracker/
├── public/
│ ├── index.html # Frontend UI and layout
│ ├── tree.js # D3 rendering and socket logic
│ └── style.css # Optional styles
├── server.js # Express + WebSocket backend
├── package.json # Node.js dependencies
└── README.md # Project documentation

## Install dependencies:

npm install

## Run the server:

node server.js

## Access the app in your browser:

http://localhost:3000

## 🎯 Usage
- Start the app.
- Open your browser at http://localhost:3000.
- Use the dropdown menu to select a census type (e.g., INCOME or CASTE).
- The tree structure will be displayed dynamically below based on your selection.

## 📌 Notes
- Ensure your browser has JavaScript enabled.
- The app will not display any tree until a census type is selected.
- Socket.IO is used for real-time communication between frontend and backend.