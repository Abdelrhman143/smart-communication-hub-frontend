// Hero section - Main landing page hero with animated typewriter text and feature badges
"use client";
import { BotMessageSquare, Wifi } from "lucide-react";
import Typewriter from "typewriter-effect";

export default function HeroInfo() {
  return (
    <div className="basis-1/2 animate-slideRight">
      <div>
        <h1 className="text-6xl font-bold">
          Smart <br /> Conversations,
        </h1>
        <span className="text-2xl lg:text-5xl text-MainColor font-bold">
          <Typewriter
            options={{
              strings: [
                "Smarter Insights",
                "automatic tagging",
                "sentiment analysis",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
        <p className="text-gray-500 my-6 max-w-2xl mx-auto lg:mx-0">
          Experience the future of communication with real-time chat enhanced by
          AI-powered sentiment analysis, automatic tagging, and intelligent
          conversation summaries.
        </p>
      </div>
      <div className="flex gap-5 justify-center lg:justify-start">
        <span className="bg-MainColor/60 py-1 px-6 text-sm flex rounded-full w-fit items-center text-white font-semibold">
          <Wifi className="mr-2" />
          Real-time messaging
        </span>
        <span className="bg-MainColor/60 py-1 px-6 text-sm flex items-center rounded-full w-fit text-white">
          <BotMessageSquare className="mr-2" />
          AI-Powered Insights
        </span>
      </div>
    </div>
  );
}
