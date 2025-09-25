// Example React component for blog management
"use client";

import { useState, useEffect } from "react";
import { getAllPosts } from "../lib/sanity/client";
import {
  createPost,
  updatePost,
  deletePost,
  duplicatePost
} from "../lib/sanity/crud";

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load posts on component mount
  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Create new post
  const handleCreatePost = async formData => {
    try {
      const newPost = await createPost({
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        authorId: formData.authorId,
        categories: formData.categories,
        featured: false,
        body: []
      });

      // Refresh posts list
      const updatedPosts = await getAllPosts();
      setPosts(updatedPosts);

      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  // Update existing post
  const handleUpdatePost = async (postId, updateData) => {
    try {
      await updatePost(postId, updateData);

      // Refresh posts list
      const updatedPosts = await getAllPosts();
      setPosts(updatedPosts);

      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    }
  };

  // Delete post
  const handleDeletePost = async postId => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);

        // Remove from local state
        setPosts(posts.filter(post => post._id !== postId));

        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post");
      }
    }
  };

  // Duplicate post
  const handleDuplicatePost = async postId => {
    try {
      await duplicatePost(postId);

      // Refresh posts list
      const updatedPosts = await getAllPosts();
      setPosts(updatedPosts);

      alert("Post duplicated successfully!");
    } catch (error) {
      console.error("Error duplicating post:", error);
      alert("Failed to duplicate post");
    }
  };

  if (loading) return <div>Loading posts...</div>;

  return (
    <div className="blog-manager">
      <h1>Blog Manager</h1>

      <div className="posts-grid">
        {posts.map(post => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="post-actions">
              <button
                onClick={() =>
                  handleUpdatePost(post._id, {
                    featured: !post.featured
                  })
                }>
                {post.featured ? "Unfeature" : "Feature"}
              </button>
              <button onClick={() => handleDuplicatePost(post._id)}>
                Duplicate
              </button>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
