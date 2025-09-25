// Quick script to help you delete blog posts
// Use this in a React component or as a standalone script

import { deletePost, getAllPosts } from "../lib/sanity/client";

// First, let's get all your posts so you can see what's available to delete
export async function listAllPosts() {
  try {
    const posts = await getAllPosts();
    console.log("Available posts to delete:");
    posts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}" (ID: ${post._id})`);
      console.log(`   Slug: ${post.slug?.current || "No slug"}`);
      console.log(`   Published: ${post.publishedAt || "Draft"}`);
      console.log("---");
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Delete a single post by ID
export async function deleteSinglePost(postId) {
  try {
    // Add confirmation
    const confirmDelete = confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );

    if (!confirmDelete) {
      console.log("Deletion cancelled");
      return;
    }

    const result = await deletePost(postId);
    console.log("Post deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// Delete posts by title (useful if you know the title)
export async function deletePostByTitle(title) {
  try {
    const posts = await getAllPosts();
    const postToDelete = posts.find(post =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );

    if (!postToDelete) {
      console.log(`No post found with title containing: "${title}"`);
      return;
    }

    console.log(`Found post: "${postToDelete.title}"`);
    const result = await deleteSinglePost(postToDelete._id);
    return result;
  } catch (error) {
    console.error("Error deleting post by title:", error);
  }
}

// Delete multiple posts at once
export async function bulkDeletePosts(postIds) {
  try {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${postIds.length} posts? This action cannot be undone.`
    );

    if (!confirmDelete) {
      console.log("Bulk deletion cancelled");
      return;
    }

    console.log(`Deleting ${postIds.length} posts...`);
    const deletePromises = postIds.map(postId => deletePost(postId));
    const results = await Promise.all(deletePromises);

    console.log(`Successfully deleted ${results.length} posts`);
    return results;
  } catch (error) {
    console.error("Error in bulk delete:", error);
  }
}

// Delete all draft posts (unpublished posts)
export async function deleteAllDrafts() {
  try {
    const posts = await getAllPosts();
    const draftPosts = posts.filter(post => !post.publishedAt);

    if (draftPosts.length === 0) {
      console.log("No draft posts found to delete");
      return;
    }

    console.log(`Found ${draftPosts.length} draft posts:`);
    draftPosts.forEach(post => {
      console.log(`- "${post.title}"`);
    });

    const confirmDelete = confirm(
      `Delete all ${draftPosts.length} draft posts?`
    );
    if (!confirmDelete) {
      console.log("Draft deletion cancelled");
      return;
    }

    const draftIds = draftPosts.map(post => post._id);
    const result = await bulkDeletePosts(draftIds);
    return result;
  } catch (error) {
    console.error("Error deleting drafts:", error);
  }
}

// Usage examples:
// 1. List all posts first to see what you have:
// listAllPosts()

// 2. Delete by post ID:
// deleteSinglePost('your-post-id-here')

// 3. Delete by title:
// deletePostByTitle('My Old Blog Post')

// 4. Delete multiple posts:
// bulkDeletePosts(['post-id-1', 'post-id-2', 'post-id-3'])

// 5. Delete all drafts:
// deleteAllDrafts()
