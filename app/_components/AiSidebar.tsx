import { BadgeQuestionMark, NotebookText, Sparkle } from "lucide-react";
import React from "react";
import { useSidebar } from "../Context/Sidebar.context";

export default function AiSidebar() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="bg-white border-l-2 border-gray-200 w-70 min-h-dvh ">
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
            Positive
          </span>
        </div>
        <div className="border-2 border-gray-100 p-5 w-full bg-blue-50 rounded-lg">
          <h4 className="mb-4 font-semibold text-sm flex items-center gap-2">
            <NotebookText className="size-4" />
            Conversation Summary
          </h4>
          <p className=" text-gray-500 text-xs">
            User requested help with AI integration. Issue resolved successfully
            with positive outcome.
          </p>
        </div>
      </div>
    </div>
  );
}
