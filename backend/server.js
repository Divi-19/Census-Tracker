const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { connectDB, getDB } = require('./db');
const { buildTree, formatTreeNodes } = require('./treeBuilder');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', async (socket) => {
  console.log('🟢 Client connected');

  socket.on('selectCensus', async (censusType) => {
    const db = getDB();
    const data = await db.collection('census_data').find({
      path: { $regex: `^${censusType}` }
    }).toArray();

    const tree = formatTreeNodes(buildTree(data));
    socket.emit('initialTree', tree);

    // Simulate updates (for demo purposes)
    setInterval(async () => {
      const doc = await db.collection('census_data').findOneAndUpdate(
        { path: { $regex: `^${censusType}` }, completed: false },
        { $set: { completed: true } },
        { returnDocument: 'after' }
      );
      if (doc.value) {
        socket.emit('updateNode', doc.value);
      }
    }, 5000);
  });
});

connectDB().then(() => {
  server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
