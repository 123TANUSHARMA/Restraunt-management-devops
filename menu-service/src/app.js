const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const fs = require('fs');
const DB_PATH = './menu.db';

if (!fs.existsSync(DB_PATH)) {
  const db = new Database(DB_PATH);
  db.exec('CREATE TABLE menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category TEXT, price REAL)');
  db.prepare('INSERT INTO menu (name, category, price) VALUES (?, ?, ?)').run('Margherita', 'Pizza', 8.5);
  db.prepare('INSERT INTO menu (name, category, price) VALUES (?, ?, ?)').run('Pasta Alfredo', 'Pasta', 7.0);
  db.close();
}

const db = new Database(DB_PATH);
const app = express();
app.use(bodyParser.json());
app.use(require('cors')());

app.get('/health', (req, res) => res.json({ok:true}));

app.get('/menu', (req, res) => {
  const rows = db.prepare('SELECT * FROM menu').all();
  res.json(rows);
});

app.post('/menu', (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'name & price required' });
  const info = db.prepare('INSERT INTO menu (name, category, price) VALUES (?, ?, ?)').run(name, category || '', price);
  res.status(201).json({ id: info.lastInsertRowid, name, category, price });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Menu service listening on ${port}`));

module.exports = app;
