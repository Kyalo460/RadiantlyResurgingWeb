// Example usage of DELETE operations

import { deletePost, batchUpdatePosts } from "./lib/sanity/crud";

// Delete a single post
async function deleteBlogPost(postId) {
  try {
    // Optional: Add confirmation before deletion
    const confirmDelete = confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      const result = await deletePost(postId);
      console.log("Post deleted successfully:", result);

      // Optional: Redirect or update UI after deletion
      window.location.href = "/blog";
    }
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
}

// Soft delete (mark as unpublished instead of actual deletion)
async function softDeletePost(postId) {
  try {
    const updateData = {
      publishedAt: null,
      _draft: true // Mark as draft
    };

    const result = await updatePost(postId, updateData);
    console.log("Post soft deleted (unpublished):", result);
  } catch (error) {
    console.error("Failed to soft delete post:", error);
  }
}

// Bulk delete multiple posts
async function bulkDeletePosts(postIds) {
  try {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${postIds.length} posts?`
    );

    if (confirmDelete) {
      const deletePromises = postIds.map(postId =>
        deletePost(postId)
      );
      const results = await Promise.all(deletePromises);

      console.log("Bulk delete completed:", results);
    }
  } catch (error) {
    console.error("Failed to bulk delete posts:", error);
  }
}

// Archive posts (move to archive category instead of deleting)
async function archivePosts(postIds, archiveCategoryId) {
  try {
    const updates = postIds.map(postId => ({
      postId,
      data: {
        categories: [{ _type: "reference", _ref: archiveCategoryId }],
        publishedAt: null // Unpublish archived posts
      }
    }));

    const result = await batchUpdatePosts(updates);
    console.log("Posts archived:", result);
  } catch (error) {
    console.error("Failed to archive posts:", error);
  }
}
