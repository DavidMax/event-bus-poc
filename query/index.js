const express = require('express');
const cors = require('cors');
const axios = require('axios');

// create express app
const app = express();
// Use express built in body parser to handle incoming JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// call cors module middleware that
// handles cross origin issues by setting special header
app.use(cors());

// Object to simulate the query db, organized by post id
const posts = {};

// Route handler for GET posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// Route handler for receiving events from the event-bus
app.post('/events', (req, res) => {
  // Grab type and data properties
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    // grab id & title from data
    const {id, title} = data;
    // insert them into posts object indexed by post id
    posts[id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const {id, content, postId } = data; 
    const post = posts[postId];
    post.comments.push({ id, content });
  }

  // Confirm event processed by responding to req w empty obj
  res.send({});

});

app.listen(4002, () => {
  console.log('Listening on 4002');
})
