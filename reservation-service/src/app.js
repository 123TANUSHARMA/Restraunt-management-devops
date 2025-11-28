const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const fs = require('fs');
const DB_PATH = './reservations.db';

if (!fs.existsSync(DB_PATH)) {
  const db = new Database(DB_PATH);
  db.exec('CREATE TABLE reservations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, time TEXT, partySize INTEGER)');
  db.close();
}
const db = new Database(DB_PATH);
const app = express();
app.use(bodyParser.json());
app.use(require('cors')());

app.get('/health', (req, res) => res.json({ok:true}));

app.post('/reservations', (req, res) => {
  const { name, time, partySize } = req.body;
  if (!name || !time) return res.status(400).json({ error: 'name & time required' });
  const info = db.prepare('INSERT INTO reservations (name, time, partySize) VALUES (?, ?, ?)').run(name, time, partySize || 1);
  res.status(201).json({ id: info.lastInsertRowid, name, time, partySize });
});

app.get('/reservations', (req, res) => {
  const rows = db.prepare('SELECT * FROM reservations').all();
  res.json(rows);
});

const port = process.env.PORT || 3004;
app.listen(port, () => console.log(`Reservation service listening on ${port}`));
module.exports = app;
