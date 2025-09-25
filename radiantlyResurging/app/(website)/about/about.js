import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";

export default function About({ authors, settings }) {
  return (
    <Container>
      {/* Hero Section */}
      <div className="mb-16 rounded-2xl bg-gradient-to-br from-[#fdfffc] to-[#FFACC5] py-12 text-center">
        <h1 className="mb-4 text-5xl font-bold text-[#011627]">
          About Radiantly Resurging
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-[#011627]">
          A faith-based community empowering your journey through
          God's redirection
        </p>
      </div>

      {/* Founder Section */}
      <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-2xl bg-[#FFACC5] shadow-lg">
            <Image
              src="/img/images/mercy.png"
              alt="Mercy - Founder of Radiantly Resurging"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="mb-6 text-3xl font-bold text-[#011627]">
            Meet Mercy
          </h2>
          <p className="mb-4 text-lg text-gray-700">
            Hi, I'm Mercy, founder of Radiantly Resurging and author
            of "In Pursuit of Breakthrough." After experiencing God's
            redirection in my own journey, I discovered that our
            wilderness seasons are actually birthplaces for our
            greatest purpose.
          </p>
          <p className="mb-6 text-lg text-gray-700">
            Despite having an MBA and finance credentials, I found
            myself facing rejection and redirection. Through seeking
            God's Word, I learned that He wasn't punishing me—He was
            positioning me for His perfect plan.
          </p>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-2 rounded-full bg-[#FF87AB]"></div>
            <p className="text-lg italic text-[#011627]">
              "Your driest places can birth your best version and true
              purpose."
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mb-16 rounded-2xl bg-[#011627] p-12 text-white">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Our Mission
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF87AB]">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold">
              Spiritual Growth
            </h3>
            <p>
              Navigate your journey of surrender, obedience, and
              spiritual warfare with Biblical tools.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFACC5]">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold">
              Financial Wisdom
            </h3>
            <p>
              Apply Biblical principles to personal finances with
              practical, faith-based insights.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fdfffc] text-[#011627]">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold">
              Personal Development
            </h3>
            <p>
              Transform through life's transitions and discover your
              God-given purpose.
            </p>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-3xl font-bold text-[#011627]">
          Join Our Community
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-700">
          Radiantly Resurging is more than a blog—it's a community of
          believers discovering that God's redirection leads to
          restoration. Whether you're in the wilderness, transition,
          or promised land, you're not alone in this journey.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-[#FF87AB] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#a53860]">
            Get in Touch
          </Link>
          <Link
            href="/archive"
            className="rounded-full border-2 border-[#FF87AB] px-8 py-3 font-semibold text-[#FF87AB] transition-all duration-300 hover:bg-[#FF87AB] hover:text-white">
            Read Our Stories
          </Link>
        </div>
      </div>

      {/* Quote Section */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FFACC5] to-[#FF87AB] p-8 text-center">
        <blockquote className="mb-4 text-2xl font-bold text-[#011627]">
          "There is a story inside you that the world needs to know."
        </blockquote>
        <p className="text-lg text-[#011627]">
          Take that leap of faith and discover how your journey can
          inspire others.
        </p>
      </div>
    </Container>
  );
}
