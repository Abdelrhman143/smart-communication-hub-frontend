// AI service - Analyzes conversation messages using Gemini API to generate summary and sentiment
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

type Message = {
  text: string;
  senderId: number;
};

// Analyze conversation messages and return AI insights (summary and sentiment)
export async function getAIInsights(
  messagesList: Message[],
  currentUserId: number
) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const mergedChatHistory = [];
  let lastRole: "user" | "model" | null = null;
  let isFirstMessage = true;

  // Format messages for Gemini API - merge consecutive messages from same sender
  for (const message of messagesList) {
    if (!message.text || message.text.trim() === "") continue;

    let currentRole: "user" | "model" =
      message.senderId === currentUserId ? "user" : "model";

    if (isFirstMessage && currentRole === "model") {
      console.log("Adjusting first message role to user.");
      currentRole = "user";
    }
    isFirstMessage = false;

    // Merge consecutive messages from same sender
    if (currentRole === lastRole) {
      const lastContentIndex = mergedChatHistory.length - 1;
      mergedChatHistory[lastContentIndex].parts[0].text += "\n" + message.text;
    } else {
      mergedChatHistory.push({
        role: currentRole,
        parts: [{ text: message.text }],
      });
      lastRole = currentRole;
    }
  }

  // Add analysis prompt to get summary and sentiment
  const finalPrompt = `You are an AI conversation analyst. Analyze the entire chat log provided above.
Give me a short and direct answer in JSON format (with no extra text, no markdown, and no comments).
The JSON should contain: {"summary": "...", "sentiment": "positive" or "negative"}.`;

  mergedChatHistory.push({
    role: "user",
    parts: [{ text: finalPrompt }],
  });

  const requestBody = {
    contents: mergedChatHistory,
  };

  // Call Gemini API
  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Raw API Error Response:", errorText);
    throw new Error(
      `Gemini API Error: Status ${res.status}. Check console for raw error response.`
    );
  }

  const responseData = await res.json();
  const jsonText = responseData.candidates[0].content.parts[0].text.trim();

  return JSON.parse(jsonText);
}
