const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const fs = require('fs');
const axios = require('axios');

const DB_PATH = './orders.db';
if (!fs.existsSync(DB_PATH)) {
  const db = new Database(DB_PATH);
  db.exec('CREATE TABLE orders (id INTEGER PRIMARY KEY AUTOINCREMENT, payload TEXT, total REAL)');
  db.close();
}
const db = new Database(DB_PATH);
const app = express();
app.use(bodyParser.json());
app.use(require('cors')());

app.get('/health', (req, res) => res.json({ok:true}));

const MENU_URL = process.env.MENU_URL || 'http://menu-service:3001';

app.post('/orders', async (req, res) => {
  const { items = [], tableId } = req.body;
  if (!items.length) return res.status(400).json({ error: 'items required' });

  try {
    const menuRes = await axios.get(`${MENU_URL}/menu`);
    const menuItems = menuRes.data;
    let total = 0;
    items.forEach(it => {
      const m = menuItems.find(mi => mi.id === it.id);
      if (m) total += (m.price * (it.qty || 1));
    });
    const info = db.prepare('INSERT INTO orders (payload, total) VALUES (?, ?)').run(JSON.stringify({ items, tableId }), total);
    const orderId = info.lastInsertRowid;
    res.status(201).json({ orderId, total, status: 'CREATED' });
  } catch (err) {
    console.error('Menu fetch error', err.message);
    res.status(500).json({ error: 'Failed to calculate total' });
  }
});

app.get('/orders/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json({ id: row.id, data: JSON.parse(row.payload), total: row.total });
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Order service listening on ${port}`));
module.exports = app;
