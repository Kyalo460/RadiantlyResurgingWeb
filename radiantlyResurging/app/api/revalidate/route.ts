// API route for on-demand revalidation when Sanity content changes
// This will be called by Sanity webhooks when content is updated

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify the request is from Sanity (optional but recommended)
    const secret = request.nextUrl.searchParams.get("secret");
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    // Get the document type that was updated
    const { _type } = body;

    // Revalidate based on document type
    switch (_type) {
      case "post":
        // Revalidate all post-related pages
        revalidateTag("posts");
        revalidateTag("post");
        console.log("✅ Revalidated post pages");
        break;
      case "author":
        revalidateTag("authors");
        console.log("✅ Revalidated author pages");
        break;
      case "category":
        revalidateTag("categories");
        console.log("✅ Revalidated category pages");
        break;
      case "settings":
        revalidateTag("settings");
        console.log("✅ Revalidated settings");
        break;
      default:
        // Revalidate everything if we're not sure
        revalidateTag("posts");
        revalidateTag("authors");
        revalidateTag("categories");
        revalidateTag("settings");
        console.log("✅ Revalidated all content");
    }

    return NextResponse.json({
      message: "Revalidation successful",
      revalidated: true,
      now: Date.now()
    });
  } catch (error) {
    console.error("❌ Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: error.message },
      { status: 500 }
    );
  }
}
