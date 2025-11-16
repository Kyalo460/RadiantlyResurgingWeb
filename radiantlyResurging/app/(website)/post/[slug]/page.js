import PostPage from "./default";
import { notFound } from "next/navigation";

import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title || "Untitled Post" };
}

export default async function Page({ params }) {
  const post = await getPostBySlug(params.slug);

  // Add validation to check if post exists and has required data
  if (!post || !post.slug) {
    notFound();
  }

  return <PostPage post={post} />;
}

export const revalidate = 60;
