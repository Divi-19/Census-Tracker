const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from public/
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("getCensusData", (type) => {
    let sampleData = {};

    if (type === "INCOME") {
      sampleData = {
        name: "Income Census",
        children: [
          {
            name: "Income Group A",
            children: [
              { name: "Household 1" },
              { name: "Household 2" }
            ]
          },
          {
            name: "Income Group B",
            children: [
              { name: "Household 3" }
            ]
          }
        ]
      };
    } else if (type === "CASTE") {
      sampleData = {
        name: "Caste Census",
        children: [
          {
            name: "Caste Group X",
            children: [
              { name: "Person A" },
              { name: "Person B" }
            ]
          }
        ]
      };
    }

    socket.emit("censusData", sampleData);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
