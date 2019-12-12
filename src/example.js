const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./flowers2019.db', sqlite3.OPEN_READWRITE,(err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected');
})

db.serialize(() => {
  db.each('SELECT name FROM members', (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.NAME);
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
