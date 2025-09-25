// Example usage of UPDATE operations

import {
  updatePost,
  togglePostFeatured,
  togglePostPublish
} from "./lib/sanity/crud";

// Update post title and excerpt
async function updateBlogPost() {
  const postId = "your-post-id-here";

  const updateData = {
    title: "Updated Blog Post Title",
    excerpt: "This is the updated excerpt for the blog post."
    // You can update any field from the schema
  };

  try {
    const result = await updatePost(postId, updateData);
    console.log("Post updated successfully:", result);
  } catch (error) {
    console.error("Failed to update post:", error);
  }
}

// Feature/unfeature a post
async function featurePost(postId, isFeatured = true) {
  try {
    const result = await togglePostFeatured(postId, isFeatured);
    console.log(
      `Post ${isFeatured ? "featured" : "unfeatured"}:`,
      result
    );
  } catch (error) {
    console.error("Failed to update featured status:", error);
  }
}

// Publish/unpublish a post
async function publishPost(postId, shouldPublish = true) {
  try {
    const result = await togglePostPublish(postId, shouldPublish);
    console.log(
      `Post ${shouldPublish ? "published" : "unpublished"}:`,
      result
    );
  } catch (error) {
    console.error("Failed to update publish status:", error);
  }
}

// Update multiple fields at once
async function updatePostContent(postId) {
  const updateData = {
    title: "New Title",
    excerpt: "New excerpt",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "This is the updated content of the blog post."
          }
        ]
      }
    ],
    categories: [
      { _type: "reference", _ref: "category-id-1" },
      { _type: "reference", _ref: "category-id-2" }
    ]
  };

  try {
    const result = await updatePost(postId, updateData);
    console.log("Post content updated:", result);
  } catch (error) {
    console.error("Failed to update post content:", error);
  }
}
