"use client";
import { useEffect } from "react";
import Feature from "./Feature";
import "aos/dist/aos.css";
import AOS from "aos";
import { MessageCircleMore, MoveUpRight, TrendingUp, Zap } from "lucide-react";
import { features } from "process";

type Props = {
  heading: string;
  descreption: string;
  icon: React.ReactNode;
};
export default function Features() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: "phone", // Disable animations on small screens
    });
  }, []);

  const featuresDetails: Props[] = [
    {
      heading: "Real-Time Chat",
      descreption:
        "Instant messaging with a beautiful, responsive interface that works seamlessly across all devices.",
      icon: <MessageCircleMore className="stroke-MainColor" />,
    },
    {
      heading: "AI-Powered Insights",
      descreption:
        "Get intelligent summaries, sentiment analysis, and automatic tagging for every conversation.",
      icon: <TrendingUp className="stroke-MainColor" />,
    },
    {
      heading: "Sentiment Analysis",
      descreption:
        "Get intelligent summaries, sentiment analysis, and automatic tagging for every conversation.",
      icon: <TrendingUp className="stroke-MainColor" />,
    },
    {
      heading: "Smart Tagging",
      descreption:
        "Automatically categorize and tag conversations for easy organization and retrieval.",
      icon: <Zap className="stroke-MainColor" />,
    },
  ];

  return (
    <section className="mb-15">
      <div>
        <h2 className="text-center text-4xl font-bold">
          Everything You Need for Smart Communication
        </h2>
        <p className="text-gray-500 mt-4 mb-10 text-lg text-center max-w-2xl mx-auto">
          Powerful features designed to make your conversations more productive
          and insightful
        </p>
      </div>
      <div className="container">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 "
          data-aos="fade-up"
        >
          {featuresDetails.map((feature) => (
            <Feature key={feature.heading} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
