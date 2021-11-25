import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});
  // grab posts from Posts service
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    // Update state with response data from posts svc
    setPosts(res.data);
  };

  // Call fetchPosts one time only
  useEffect(() => {
    fetchPosts();
  }, []);

  // Grab array of post objects, map over & generate each one
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
