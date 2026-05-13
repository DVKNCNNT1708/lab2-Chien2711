const express = require('express');
const app = express();
app.use(express.json());

// Đây là API mà Core cung cấp cho IoT
app.post('/api/data', (req, res) => {
  res.status(200).json({ message: 'Data received successfully' });
});

// Chạy server ở port 8080
const server = app.listen(8080, () => {
  console.log('Core API đang chạy tại http://localhost:8080');
});

module.exports = server;