const express = require('express');
const cors = require('cors');
const axios = require('axios');

// create new express app
const app = express();

// Use express built in body parser to handle incoming JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// call cors module middleware that
// handles cross origin issues by setting special header
app.use(cors());

// Request handler to listen for incoming events & broadcast them back to all services
app.post('/events', (req, res) => {
    // Grab event which is request body
    const event = req.body;
    // Make POST requests to all other services containing the event
    axios.post('http://localhost:4000/events', event).catch(err => console.log('Posts svc error. Port 4000', err.message));
    axios.post('http://localhost:4001/events', event).catch(err => console.log('Comments svc error. Port 4001', err.message));
    axios.post('http://localhost:4002/events', event).catch(err => console.log('Query svc error. Port 4002', err.message));
    // when calls are done respond to original request with status
    res.send({ status: 'OK'});
})

app.listen(4005, () => { console.log('Listening on port 4005') });
