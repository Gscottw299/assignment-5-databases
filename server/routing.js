const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./flowers2019.db', sqlite3.OPEN_READWRITE,(err) => {
  if (err) {
    console.error(err.message);
  }
  else {
    console.log('Connected');
  }
})

router.route('/get').get((req, res) => {

  db.all('SELECT comname FROM flowers ORDER BY comname', (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.json(row);
  });
})
// 'SELECT * FROM (SELECT * FROM SIGHTINGS WHERE name = ${temp} ORDER BY sighted DESC LIMIT 10)'
router.route('/get/:comname').get((req, res) => {
  var temp = req.params.comname;
  temp = temp.replace(/%20/g, " ");
  var text = "SELECT * FROM (SELECT * FROM SIGHTINGS WHERE name = '" + temp + "' ORDER BY sighted DESC LIMIT 10)";
  db.all(text, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.json(row);
  })
})

router.route('/insert').post((req, res) => {
  const flower = req.body.flower;
  const name = req.body.name;
  const location = req.body.location;
  const sighted = req.body.sighted;
  var text = "INSERT INTO SIGHTINGS VALUES('" +flower+"', '"+name+"', '"+location+"', '"+sighted+"');"
  db.run(text)
  res.json(text)
})

router.route('/update/:comname').post((req, res) => {
  const name = req.body.name;
  const old = req.params.comname;
  var text = "UPDATE SIGHTINGS set name = '"+name+"' WHERE name = '"+old+"'"
  var other = "UPDATE FLOWERS set comname = '"+name+"' WHERE comname = '"+old+"'"
  db.run(text)
  db.run(other)
  res.json(text)
})

/*db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});*/
module.exports = router;
