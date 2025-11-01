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

  const mergedChatHistory = [];
  let lastRole: "user" | "model" | null = null;
  let isFirstMessage = true;

  for (const message of messagesList) {
    if (!message.text || message.text.trim() === "") continue;

    let currentRole: "user" | "model" =
      message.senderId === currentUserId ? "user" : "model"; // 🛑 FIX: إذا كانت الرسالة الأولى هي 'model'، نجعلها 'user' لتفادي خطأ 400

    if (isFirstMessage && currentRole === "model") {
      console.log("Adjusting first message role to user.");
      currentRole = "user";
    }
    isFirstMessage = false;

    if (currentRole === lastRole) {
      // دمج: إذا كان الدور متكررًا
      const lastContentIndex = mergedChatHistory.length - 1;
      mergedChatHistory[lastContentIndex].parts[0].text += "\n" + message.text;
    } else {
      // إضافة: إذا كان الدور مختلفًا
      mergedChatHistory.push({
        role: currentRole,
        parts: [{ text: message.text }],
      });
      lastRole = currentRole;
    }
  }

  console.log("Merged Chat History Ready:", mergedChatHistory);

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
  console.log("Gemini Raw JSON Output:", jsonText);
  return JSON.parse(jsonText);
}
