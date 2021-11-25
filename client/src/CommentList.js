import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch array of comments for a given post from comments svc
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      // Update comments state with response
      setComments(res.data);
    };
    fetchData();
  }, [postId]);

  // build each comment list item
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
