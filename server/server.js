const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const routing = require('./routing');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/tables', routing);

// Use env port or default
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server now running on port ${port}!`));
