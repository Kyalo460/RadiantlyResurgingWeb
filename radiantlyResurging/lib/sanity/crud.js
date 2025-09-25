import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./config";

// Create a client with write permissions
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for write operations
  token: process.env.SANITY_API_WRITE_TOKEN // You need to set this in your .env.local
});

// CREATE - Add a new blog post
export async function createPost(postData) {
  try {
    const result = await writeClient.create({
      _type: "post",
      title: postData.title,
      slug: {
        _type: "slug",
        current: postData.slug
      },
      excerpt: postData.excerpt,
      author: {
        _type: "reference",
        _ref: postData.authorId // Reference to existing author
      },
      mainImage: postData.mainImage
        ? {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: postData.mainImage.assetId
            },
            alt: postData.mainImage.alt
          }
        : undefined,
      categories:
        postData.categories?.map(catId => ({
          _type: "reference",
          _ref: catId
        })) || [],
      publishedAt: postData.publishedAt || new Date().toISOString(),
      featured: postData.featured || false,
      body: postData.body || []
    });

    console.log("Post created:", result);
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// UPDATE - Edit an existing blog post
export async function updatePost(postId, updateData) {
  try {
    const result = await writeClient
      .patch(postId) // Document ID to patch
      .set(updateData) // Shallow merge
      .commit(); // Perform the patch and return a promise

    console.log("Post updated:", result);
    return result;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

// DELETE - Remove a blog post
export async function deletePost(postId) {
  try {
    const result = await writeClient.delete(postId);
    console.log("Post deleted:", result);
    return result;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// PUBLISH/UNPUBLISH - Toggle post visibility
export async function togglePostPublish(postId, shouldPublish) {
  try {
    const updateData = shouldPublish
      ? { publishedAt: new Date().toISOString() }
      : { publishedAt: null };

    const result = await updatePost(postId, updateData);
    return result;
  } catch (error) {
    console.error("Error toggling post publish status:", error);
    throw error;
  }
}

// FEATURE/UNFEATURE - Toggle featured status
export async function togglePostFeatured(postId, isFeatured) {
  try {
    const result = await updatePost(postId, { featured: isFeatured });
    return result;
  } catch (error) {
    console.error("Error toggling post featured status:", error);
    throw error;
  }
}

// BATCH OPERATIONS - Multiple posts at once
export async function batchUpdatePosts(updates) {
  try {
    const transaction = writeClient.transaction();

    updates.forEach(({ postId, data }) => {
      transaction.patch(postId, { set: data });
    });

    const result = await transaction.commit();
    console.log("Batch update completed:", result);
    return result;
  } catch (error) {
    console.error("Error in batch update:", error);
    throw error;
  }
}

// DUPLICATE - Create a copy of existing post
export async function duplicatePost(originalPostId) {
  try {
    // First, fetch the original post
    const originalPost =
      await writeClient.getDocument(originalPostId);

    if (!originalPost) {
      throw new Error("Original post not found");
    }

    // Create a new post based on the original
    const duplicatedPost = {
      ...originalPost,
      _id: undefined, // Remove ID to create new document
      _rev: undefined, // Remove revision
      title: `${originalPost.title} (Copy)`,
      slug: {
        _type: "slug",
        current: `${originalPost.slug.current}-copy-${Date.now()}`
      },
      publishedAt: new Date().toISOString(),
      featured: false // Don't feature duplicates by default
    };

    const result = await writeClient.create(duplicatedPost);
    console.log("Post duplicated:", result);
    return result;
  } catch (error) {
    console.error("Error duplicating post:", error);
    throw error;
  }
}
