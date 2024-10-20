const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON request bodies

// Open or create the SQLite database
function openDB() {
    return new sqlite3.Database(path.resolve(__dirname, 'posts.db'), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });
}

// Ensure 'posts' table exists
function setupDB() {
    const db = openDB();
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            roleDescription TEXT,
            tags TEXT,
            streetAddress TEXT,
            emailAddress TEXT,
            summary TEXT
        )
    `);
    return db;
}

// Add a new post
app.post('/posts', (req, res) => {
    const { title, roleDescription, tags, streetAddress, emailAddress, summary } = req.body;

    const db = setupDB();
    const stmt = db.prepare(`
        INSERT INTO posts (title, roleDescription, tags, streetAddress, emailAddress, summary) 
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run([title, roleDescription, tags, streetAddress, emailAddress, summary], function (err) {
        if (err) {
            res.status(500).send('Error inserting post: ' + err.message);
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });

    stmt.finalize();
});

// Get all posts
app.get('/posts', (req, res) => {
    const db = setupDB();
    db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving posts: ' + err.message);
        } else {
            res.status(200).json(rows);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
