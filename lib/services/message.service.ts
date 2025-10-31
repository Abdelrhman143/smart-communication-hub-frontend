const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchMessages(token: string, otherUserId: number) {
  const res = await fetch(`${BASE_URL}/messages/${otherUserId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.error || "فشل جلب الرسائل");
  }

  return responseData;
}
