import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import Image from "next/image";

export default function HomePage({ posts }) {
  return (
    <main>
      <section
        style={{
          position: "relative",
          width: "90%",
          height: "450px",
          // margin: "40px auto",
          margin: "0px auto",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
          // backgroundColor: "#011627",
        }}
        className="h-100% relative w-[350px] md:h-64 md:w-3/4 lg:h-80 lg:w-2/3 xl:h-96 xl:w-1/2">
        <Image
          src="/img/background/pink-sunset.jpeg"
          alt="Landing background"
          layout="fill"
          objectFit="cover"
          style={{
            borderRadius: "16px",
            zIndex: 0
          }}
          priority
        />
        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 172, 197, 0.4)", // accent-2 overlay
            zIndex: 1
          }}
        /> */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            textAlign: "center"
          }}>
          <h1 className="text-dark-900 text-3xl font-bold dark:text-white">
            Welcome to Radiantly Resurging
          </h1>
          <p className="mt-2 text-lg text-[#4C0827]">
            Resurge After A Wilderness And Purging Season
          </p>
        </div>
      </section>

      {/* Blogs Section Title */}
      <div className="py-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-[#011627]">
          Latest Blogs
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Discover inspiring stories, practical wisdom, and
          faith-based insights to guide your journey
        </p>
      </div>

      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
          {posts.slice(0, 2).map(post => (
            <PostList
              key={post._id}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          ))}
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
          {posts.slice(2, 14).map(post => (
            <PostList key={post._id} post={post} aspect="square" />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/archive"
            className="relative inline-flex items-center gap-1 rounded-md border border-pink-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-[#4C0827] hover:border-pink-400 hover:bg-pink-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-pink-500 dark:bg-gray-800 dark:text-pink-300 dark:hover:bg-pink-900/20">
            <span>View all Posts</span>
          </Link>
        </div>
      </Container>
    </main>
  );
}
