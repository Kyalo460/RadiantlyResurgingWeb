"use client";

import Container from "@/components/container";
import CoachingPaymentModal from "@/components/CoachingPaymentModal";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  UserIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

export default function Coaching({ settings }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const coachingPlans = [
    {
      id: "group",
      name: "Group Coaching",
      price: 97,
      duration: "per month",
      description:
        "Join a supportive community of faith-driven individuals on their journey of spiritual and personal growth.",
      features: [
        "Weekly 90-minute group sessions",
        "Access to exclusive resource library",
        "Monthly guest speaker sessions",
        "Private Facebook community",
        "Email support between sessions",
        "Downloadable worksheets and guides",
        "Prayer partner matching",
        "Goal tracking and accountability"
      ],
      maxParticipants: "8-12 people",
      schedule: "Wednesdays 7-8:30 PM EST",
      popular: false,
      buttonText: "Join Group Coaching",
      icon: UserGroupIcon
    },
    {
      id: "oneOnOne",
      name: "One-on-One Coaching",
      price: 297,
      duration: "per month",
      description:
        "Personalized coaching tailored to your unique journey, challenges, and God-given purpose.",
      features: [
        "Four 60-minute private sessions monthly",
        "Customized spiritual growth plan",
        "Direct access via phone/text",
        "Personalized prayer and reflection guides",
        "Goal setting and strategic planning",
        "Crisis support and emergency calls",
        "Custom resource recommendations",
        "Quarterly progress assessments"
      ],
      maxParticipants: "Just you and Mercy",
      schedule: "Flexible scheduling",
      popular: true,
      buttonText: "Start Private Coaching",
      icon: UserIcon
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Group Coaching Graduate",
      image: "/img/images/testimonial1.jpg",
      quote:
        "The group coaching program transformed my relationship with God and gave me clarity on my purpose. The community support was incredible!"
    },
    {
      name: "Jennifer K.",
      role: "One-on-One Client",
      image: "/img/images/testimonial2.jpg",
      quote:
        "Mercy's personalized approach helped me navigate my career transition with faith and confidence. Best investment I've made in myself."
    }
  ];

  return (
    <Container>
      {/* Hero Section */}
      <div className="mb-16 rounded-2xl bg-gradient-to-br from-[#fdfffc] to-[#FFACC5] py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold text-[#011627] md:text-6xl">
            Transform Your Journey with
            <span className="block text-[#FF87AB]">
              Faith-Based Coaching
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-[#011627]">
            Whether you're seeking community support or personalized
            guidance, discover your God-given purpose through our
            proven coaching programs.
          </p>
          <div className="flex items-center justify-center space-x-2 text-[#011627]">
            <HeartIcon className="h-6 w-6 text-[#FF87AB]" />
            <span className="text-lg font-medium">
              Biblically grounded • Purpose driven • Community focused
            </span>
          </div>
        </div>
      </div>

      {/* Coaching Options */}
      <div className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#011627]">
            Choose Your Coaching Journey
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            Both programs are designed to help you navigate life's
            transitions with faith, clarity, and purpose. Choose the
            format that best fits your needs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {coachingPlans.map(plan => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-[#FF87AB] ring-2 ring-[#FF87AB] ring-opacity-20"
                    : "border-gray-200 hover:border-[#FFACC5]"
                }`}>
                {plan.popular && (
                  <div className="absolute -right-8 top-6 rotate-45 bg-[#FF87AB] px-8 py-1 text-xs font-bold text-white">
                    POPULAR
                  </div>
                )}

                <div className="mb-6 flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFACC5]">
                    <IconComponent className="h-8 w-8 text-[#011627]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#011627]">
                      {plan.name}
                    </h3>
                    <p className="text-gray-700">
                      {plan.maxParticipants}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-[#011627]">
                      ${plan.price}
                    </span>
                    <span className="text-gray-700">
                      /{plan.duration}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-gray-700">
                    <ClockIcon className="h-4 w-4" />
                    <span>{plan.schedule}</span>
                  </div>
                </div>

                <p className="mb-6 text-gray-700">
                  {plan.description}
                </p>

                <ul className="mb-8 flex-grow space-y-3">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3">
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#FF87AB]" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`mt-auto w-full rounded-lg py-4 font-bold transition-all duration-200 ${
                    plan.popular
                      ? "transform bg-[#FF87AB] text-[#011627] hover:scale-105 hover:bg-[#FF6B9D] hover:text-white"
                      : "bg-[#FFACC5] text-[#011627] hover:bg-[#FF87AB] hover:text-white"
                  }`}>
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* About Mercy Section */}
      <div className="mb-20 rounded-2xl bg-[#011627] p-12 text-white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">
              Meet Your Coach
            </h2>
            <p className="mb-4 text-lg text-gray-300">
              Hi, I'm Mercy - your faith-based coach and guide. With
              an MBA in finance and years of experience navigating
              God's redirection in my own life, I'm passionate about
              helping others discover their purpose through life's
              transitions.
            </p>
            <p className="mb-6 text-lg text-gray-300">
              As the author of "In Pursuit of Breakthrough," I've
              learned that our wilderness seasons are often
              birthplaces for our greatest breakthroughs. I'm here to
              walk alongside you on this journey.
            </p>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-2 rounded-full bg-[#FF87AB]"></div>
              <p className="text-lg italic text-[#FFACC5]">
                "Your driest places can birth your best version and
                true purpose."
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-[#FFACC5] shadow-lg">
              <Image
                src="/img/images/mercy.png"
                alt="Mercy - Your Faith-Based Coach"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Gain Section */}
      <div className="mb-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-[#011627]">
          What You'll Gain
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFACC5] to-[#FF87AB]">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-[#011627]">
              Spiritual Clarity
            </h3>
            <p className="text-gray-700">
              Gain deeper understanding of God's plan for your life
              and learn to navigate His redirection with confidence
              and peace.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFACC5] to-[#FF87AB]">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-[#011627]">
              Purpose Alignment
            </h3>
            <p className="text-gray-700">
              Discover and align with your God-given purpose, turning
              life's challenges into stepping stones for your calling.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFACC5] to-[#FF87AB]">
              <span className="text-3xl">💪</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-[#011627]">
              Resilient Faith
            </h3>
            <p className="text-gray-700">
              Build unshakeable faith and resilience that will carry
              you through life's transitions with grace and strength.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-[#011627]">
          What Our Community Says
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl bg-gradient-to-br from-[#fdfffc] to-[#FFACC5] p-8">
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 fill-[#FF87AB] text-[#FF87AB]"
                  />
                ))}
              </div>
              <p className="mb-6 text-lg italic text-[#011627]">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-[#FF87AB]">
                  <div className="flex h-full w-full items-center justify-center font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-[#011627]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-[#011627]">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-semibold text-[#011627]">
              How do I know which coaching option is right for me?
            </h3>
            <p className="text-gray-700">
              If you thrive in community settings and enjoy shared
              learning experiences, group coaching is perfect. If you
              prefer personalized attention and have specific
              challenges to address, one-on-one coaching would be
              ideal.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-semibold text-[#011627]">
              What if I need to cancel or reschedule?
            </h3>
            <p className="text-gray-700">
              We understand life happens! Group sessions are recorded
              for members who miss. One-on-one sessions can be
              rescheduled with 24-hour notice.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-semibold text-[#011627]">
              Is this coaching program faith-based?
            </h3>
            <p className="text-gray-700">
              Yes! All our coaching is grounded in Biblical principles
              and designed to strengthen your relationship with God
              while achieving your personal goals.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mb-16 rounded-2xl bg-gradient-to-r from-[#FF87AB] to-[#FFACC5] p-12 text-center text-white">
        <h2 className="mb-4 text-4xl font-bold">
          Ready to Transform Your Journey?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Don't let another season pass without clarity and purpose.
          Your breakthrough is waiting on the other side of surrender.
        </p>
        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
          <button className="rounded-lg bg-white px-8 py-4 font-bold text-[#FF87AB] transition-all duration-200 hover:scale-105 hover:bg-gray-100">
            Schedule a Free Discovery Call
          </button>
          <Link
            href="/contact"
            className="rounded-lg border-2 border-white px-8 py-4 font-bold text-white transition-all duration-200 hover:bg-white hover:text-[#FF87AB]">
            Have Questions? Contact Us
          </Link>
        </div>
      </div>

      {/* PayPal Payment Modal */}
      <CoachingPaymentModal
        selectedPlan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
        coachingPlans={coachingPlans}
      />
    </Container>
  );
}
