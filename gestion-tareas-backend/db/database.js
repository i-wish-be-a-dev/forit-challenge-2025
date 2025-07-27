const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
        return
    } 
     
    const createTableQuery = `CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tittle TEXT,
                description TEXT,
                completed BOOLEAN DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
    db.run(createTableQuery, function (err) {
         
        if (err) {
        console.error('Error creating tasks table: ' + err.message);
        } else {
        console.log('Tasks table created or already exists.');
        }
  });
});

module.exports = db;