import { getSettings } from "@/lib/sanity/client";
import Coaching from "./coaching";

export default async function CoachingPage() {
  const settings = await getSettings();
  return <Coaching settings={settings} />;
}

export const metadata = {
  title: "Faith-Based Coaching | Radiantly Resurging",
  description:
    "Transform your journey with our faith-based coaching programs. Choose from group coaching or one-on-one sessions to discover your God-given purpose and navigate life's transitions with confidence.",
  keywords:
    "faith-based coaching, spiritual coaching, Christian coaching, personal development, group coaching, one-on-one coaching, life transitions, purpose discovery"
};

// export const revalidate = 60;
