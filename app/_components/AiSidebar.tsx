// AI Sidebar - Displays AI-powered conversation insights (summary and sentiment analysis)
"use client";
import { BadgeQuestionMark, NotebookText, Sparkle } from "lucide-react";
import { useSidebar } from "../Context/Sidebar.context";
import { useAuth } from "../Context/Auth.context";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAIInsights } from "@/lib/services/ai.service";
import { fetchMessages } from "@/lib/services/message.service";
import { Message } from "./Chat";

type AIInsights = {
  summary: string;
  sentiment: "positive" | "negative";
};

export default function AiSidebar() {
  const { toggleSidebar } = useSidebar();
  const { token, userId: currentUserId } = useAuth();
  const params = useParams();
  const selectedUserId = params.id;

  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch AI insights when user or conversation changes
  useEffect(() => {
    if (!token || !selectedUserId || !currentUserId) {
      setInsights(null);
      return;
    }

    // Fetch messages and analyze with AI
    const fetchAiInsights = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const messagesData = await fetchMessages(token, Number(selectedUserId));

        const messages = messagesData.messages as Message[];

        // If no messages, don't analyze
        if (!messages || messages.length === 0) {
          setInsights(null);
          setIsLoading(false);
          return;
        }
        // Format messages for AI service
        const formattedMessages = messages.map((msg) => ({
          text: msg.text,
          senderId: msg.senderId,
        }));
        const aiResponse = await getAIInsights(
          formattedMessages,
          currentUserId
        );

        // Ensure sentiment is only positive or negative
        const sentiment = aiResponse.sentiment
          ?.toLowerCase()
          .includes("positive")
          ? "positive"
          : "negative";

        setInsights({
          summary: aiResponse.summary || "No summary available.",
          sentiment,
        });
      } catch (error) {
        console.error("Error fetching AI insights:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load insights"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAiInsights();
  }, [token, selectedUserId, currentUserId]);

  return (
    <div className="bg-white border-l-2 border-gray-200 w-70 min-h-dvh  transition ">
      {/* header */}
      <div className="p-5 border-b-2 border-gray-200 flex items-center">
        <h1 className="font-semibold text-2xl">Ai insights</h1>
        <Sparkle
          className=" ml-auto animate-bounce lg:hidden"
          onClick={() => toggleSidebar("ai")}
        />
      </div>

      <div className="p-5 space-y-6">
        <div className="border-2 border-gray-100 p-5 w-full bg-blue-50 rounded-lg">
          <h4 className="mb-4 font-semibold text-sm flex items-center gap-2">
            <BadgeQuestionMark className="size-4" />
            Chat mood
          </h4>
          <span className="bg-MainColor px-4 py-1 text-white rounded-full text-xs">
            {isLoading || insights === null
              ? "Analyzing..."
              : `${insights?.sentiment}`}
          </span>
        </div>
        <div className="border-2 border-gray-100 p-5 w-full bg-blue-50 rounded-lg">
          <h4 className="mb-4 font-semibold text-sm flex items-center gap-2">
            <NotebookText className="size-4" />
            Conversation Summary
          </h4>
          <p className=" text-gray-500 text-xs">
            {isLoading || insights === null
              ? "generating..."
              : `${insights?.summary}`}
          </p>
        </div>
      </div>
    </div>
  );
}
