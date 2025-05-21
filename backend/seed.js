const { MongoClient } = require('mongodb');
require('dotenv').config();

const data = [
  {
    path: ["INCOME"],
    parent_path: [],
    type: "CENSUS_TYPE",
    value: "INCOME",
    completed: false
  },
  {
    path: ["INCOME", "मुंबई उपनगर जिल्हा"],
    parent_path: ["INCOME"],
    type: "DISTRICT",
    value: "मुंबई उपनगर जिल्हा",
    completed: false
  },
  {
    path: ["INCOME", "मुंबई उपनगर जिल्हा", "A"],
    parent_path: ["INCOME", "मुंबई उपनगर जिल्हा"],
    type: "LETTER",
    value: "A",
    completed: false
  },
  {
    path: ["INCOME", "मुंबई उपनगर जिल्हा", "A", "Akse"],
    parent_path: ["INCOME", "मुंबई उपनगर जिल्हा", "A"],
    type: "AREA",
    value: "Akse",
    completed: false
  },
  {
    path: ["INCOME", "मुंबई उपनगर जिल्हा", "A", "Akse", "0"],
    parent_path: ["INCOME", "मुंबई उपनगर जिल्हा", "A", "Akse"],
    type: "PROPERTY_NUMBER",
    value: "0",
    completed: true
  },
  {
    path: ["INCOME", "मुंबई उपनगर जिल्हा", "B"],
    parent_path: ["INCOME", "मुंबई उपनगर जिल्हा"],
    type: "LETTER",
    value: "B",
    completed: false
  },
  {
    path: ["INCOME", "मुंबई उपनगर जिल्हा", "B", "Akse"],
    parent_path: ["INCOME", "मुंबई उपनगर जिल्हा", "B"],
    type: "AREA",
    value: "Akse",
    completed: false
  },
  {
    path: ["CASTE"],
    parent_path: [],
    type: "CENSUS_TYPE",
    value: "CASTE",
    completed: false
  },
  {
    path: ["CASTE", "पुणे जिल्हा"],
    parent_path: ["CASTE"],
    type: "DISTRICT",
    value: "पुणे जिल्हा",
    completed: false
  },
  {
    path: ["CASTE", "पुणे जिल्हा", "C"],
    parent_path: ["CASTE", "पुणे जिल्हा"],
    type: "LETTER",
    value: "C",
    completed: false
  },
  {
    path: ["CASTE", "पुणे जिल्हा", "C", "Chinchwad"],
    parent_path: ["CASTE", "पुणे जिल्हा", "C"],
    type: "AREA",
    value: "Chinchwad",
    completed: false
  },
  {
    path: ["CASTE", "पुणे जिल्हा", "C", "Chinchwad", "100"],
    parent_path: ["CASTE", "पुणे जिल्हा", "C", "Chinchwad"],
    type: "PROPERTY_NUMBER",
    value: "100",
    completed: false
  }
];

async function seed() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db('censusDB');
    const collection = db.collection('census_data');

    await collection.deleteMany({});
    await collection.insertMany(data);

    console.log('✅ Sample data inserted.');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    await client.close();
  }
}

seed();

