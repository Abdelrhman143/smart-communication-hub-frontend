// User service - Fetches list of all available users for messaging
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all users available for messaging
export async function fetchUsers(token: string) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.error || "فشل جلب المستخدمين");
  }

  return responseData;
}
