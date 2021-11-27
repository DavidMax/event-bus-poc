const express = require('express');
const { randomBytes } = require('crypto');
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

// Object to simulate results from call to posts db
const posts = {};

// Route handler to get all posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// Route handler to create a post
app.post('/posts', async (req, res) => {
  // create new post id and convert to hex string
  const id = randomBytes(4).toString('hex');
  // destructure title from request body
  const { title } = req.body;
  // add new key to post obj w new id and title
  posts[id] = {
    id,
    title
  };
  // Send PostCreated event to event bus w id and title of new post
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
        id,
        title
    }
  });
  // respond w resource created code & new post to confirm
  res.status(201).send(posts[id]);
});

// Route handler for events coming from event bus
app.post('/events', (req, res) => {
  // TODO: Remove this log of events
  console.log('Received Event', req.body.type);
  res.send({})
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
