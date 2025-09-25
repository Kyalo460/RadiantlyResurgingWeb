import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";

async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    // enable this for resolving opengraph image
    // metadataBase: new URL(settings.url),
    title: {
      default:
        "RadiantlyResurging - Christian Wellness & Personal Growth Community",
      template:
        "%s | RadiantlyResurging - Faith-Based Wellness & Growth"
    },
    description:
      "Join RadiantlyResurging, a faith-based community dedicated to holistic wellness and personal growth. Discover Christian inspiration, mindfulness practices, self-care tips, and transformative content that empowers your spiritual journey. Embrace your radiance through God's love.",
    keywords: [
      "Christian",
      "Blog",
      "Blogs",
      "Wellness",
      "Health",
      "Personal Growth",
      "Faith",
      "Inspiration",
      "Spirituality",
      "Community",
      "Empowerment",
      "Mindfulness",
      "Self-Care",
      "Holistic Living",
      "Motivation",
      "Transformation",
      "Encouragement",
      "Resilience",
      "Hope",
      "Healing"
    ],
    authors: [{ name: "kyalo460" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Stablo Template",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  return (
    <div className="bg-[#f5ebe0]">
      <Navbar {...settings} />

      <div>{children}</div>

      <Footer {...settings} />
    </div>
  );
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
