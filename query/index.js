const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// create express app
const app = express();
app.use(bodyParser.json());

// call cors module middleware that
// handles cross origin issues by setting special header
app.use(cors());

// Route handler for GET posts
app.get('/posts', (req, res) => {

});

// Route handler for receiving events from the event-bus
app.get('posts', (req, res) => {

});

app.listen(4002, () => {
  console.log('Listening on 4002');
})
