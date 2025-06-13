const express = require('express');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const FILE_PATH = process.env.FILE_PATH || './input.json';

app.post('/update', (req, res) => {
  const { action, content } = req.body;
  if (!action || !content) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const newData = JSON.stringify({ action, content }, null, 2);
  fs.writeFile(FILE_PATH, newData, (err) => {
    if (err) {
      console.error('❌ Error writing file:', err);
      return res.status(500).json({ error: 'Failed to write file' });
    }
    console.log(`✅ Updated input.json with action: ${action}`);
    res.json({ status: 'ok' });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
