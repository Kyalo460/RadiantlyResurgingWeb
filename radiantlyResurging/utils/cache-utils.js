// Utility functions for manual cache management
// Use these when you need to clear cache manually

export async function clearBlogCache() {
  try {
    const response = await fetch(
      "/api/revalidate?secret=your-super-secret-revalidation-key-12345",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _type: "post" })
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Blog cache cleared successfully:", result);
      return result;
    } else {
      console.error("❌ Failed to clear cache:", result);
      return null;
    }
  } catch (error) {
    console.error("❌ Error clearing cache:", error);
    return null;
  }
}

export async function clearAllCache() {
  try {
    const response = await fetch(
      "/api/revalidate?secret=your-super-secret-revalidation-key-12345",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _type: "unknown" }) // Will clear all caches
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log("✅ All cache cleared successfully:", result);
      return result;
    } else {
      console.error("❌ Failed to clear cache:", result);
      return null;
    }
  } catch (error) {
    console.error("❌ Error clearing cache:", error);
    return null;
  }
}

// Example usage in a React component:
// import { clearBlogCache, clearAllCache } from '../utils/cache-utils'
//
// function AdminPanel() {
//   const handleClearCache = async () => {
//     await clearBlogCache()
//     window.location.reload() // Refresh the page
//   }
//
//   return (
//     <div>
//       <button onClick={handleClearCache}>Clear Blog Cache</button>
//     </div>
//   )
// }
