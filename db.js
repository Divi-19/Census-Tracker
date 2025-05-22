const mongoose = require('mongoose');

const CensusNodeSchema = new mongoose.Schema({
  path: [String],
  parent_path: [String],
  value: String,
  type: String,
  completed: Boolean,
  updated_at: Date
});

const CensusNode = mongoose.model('CensusNode', CensusNodeSchema);

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/census');
  console.log("Connected to MongoDB");
}

module.exports = {
  connectDB,
  CensusNode
};
