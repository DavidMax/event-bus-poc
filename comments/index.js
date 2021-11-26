const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

// create express app
const app = express();
app.use(bodyParser.json());

// call cors module middleware that
// handles cross origin issues by setting special header
app.use(cors());

// Object to simulate results of call to comments db
// will map a given post id to arrays of comment objects
const commentsByPostId = {};

// Route handler for getting all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  // lookup comments arr by id and respond or empty if undef
  res.send(commentsByPostId[req.params.id] || []);
});

// Route handeler for adding new comment to a post
app.post('/posts/:id/comments', async (req, res) => {
  // create new comment id and convert to hex string
  const commentId = randomBytes(4).toString('hex');
  // Pull out content from request body
  const { content } = req.body;
  // grab comments arr if id from url ok, else empty array
  const comments = commentsByPostId[req.params.id] || [];
  // push in new comment w id & contents user request body
  comments.push({ id: commentId, content });
  // assign updated comments arr back to same post id
  commentsByPostId[req.params.id] = comments;
    // Send event to event-bus w title + post id & new comment id
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id
    }
  });
  // respond w create success code & arr as confirmation
  res.status(201).send(comments);
});

// Route handler for events coming from event bus
app.post('/events', (req, res) => {
  // TODO: Remove this log of events
  console.log('Received Event', req.body.type);
  res.send({})
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
