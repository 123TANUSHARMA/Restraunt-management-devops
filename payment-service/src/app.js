const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const fs = require('fs');
const DB_PATH = './payments.db';

if (!fs.existsSync(DB_PATH)) {
  const db = new Database(DB_PATH);
  db.exec('CREATE TABLE payments (id INTEGER PRIMARY KEY AUTOINCREMENT, orderId INTEGER, amount REAL, status TEXT)');
  db.close();
}
const db = new Database(DB_PATH);
const app = express();
app.use(bodyParser.json());
app.use(require('cors')());

app.get('/health', (req, res) => res.json({ok:true}));

app.post('/payments', (req, res) => {
  const { orderId, amount } = req.body;
  if (!orderId || !amount) return res.status(400).json({ error: 'orderId & amount required' });
  const status = Math.random() > 0.1 ? 'PAID' : 'FAILED';
  const info = db.prepare('INSERT INTO payments (orderId, amount, status) VALUES (?, ?, ?)').run(orderId, amount, status);
  res.json({ id: info.lastInsertRowid, orderId, amount, status });
});

app.get('/payments/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM payments WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Payment service listening on ${port}`));
module.exports = app;
