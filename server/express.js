const path = require('path'),
    express = require('express'),
    //exampleRouter = require('../routes/examples.server.routes'),
    sqlite3 = require('sqlite3').verbose(),
    routing = require('./routing');

module.exports.init = () => {


  let db = new sqlite3.Database('./flowers2019.db', sqlite3.OPEN_READWRITE,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected');
  })
    // initialize app
    const app = express();
    // enable request logging for development debugging

    // add a router

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    // new code
    app.use('/routing', routing);

    return app
}
