const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

type Message = {
  text: string;
  senderId: number;
};

export async function getAIInsights(
  messagesList: Message[],
  currentUserId: number
) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  const formatedChat = messagesList
    .map((message) => {
      const sender = message.senderId === currentUserId ? "me" : "other user";
      return `${sender}: ${message.text}`;
    })
    .join("\n");

  const prompt = `You are an AI conversation analyst. Analyze the following chat log between "Me" and "The other party".
Give me a short and direct answer in JSON format (with no extra text before or after the JSON).
The JSON should contain:
1. summary: a short summary of the main topic of the conversation.
2. sentiment: the overall sentiment of the conversation. Return ONLY "positive" or "negative" (choose the closest one).

Chat Log:
---
${formatedChat}
---`;
  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
    },
  };

  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      `Gemini API Error: ${errorData.error.message || "Failed to analyze chat"}`
    );
  }

  const responseData = await res.json();
  const jsonText = responseData.candidates[0].content.parts[0].text;
  console.log(jsonText);
  return JSON.parse(jsonText);
}
