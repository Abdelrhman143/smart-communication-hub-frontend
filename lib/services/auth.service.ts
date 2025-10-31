import { LoginFormData, RegisterFormData } from "../schema/auth.schema";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUserService(data: RegisterFormData) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });
  console.log(res);
  const responseData = await res.json();
  if (!res.ok) {
    throw Error(responseData.error || "error in register");
  }
  return responseData;
}

export async function loginUserService(data: LoginFormData) {
  console.log(BASE_URL);
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  console.log("Res", res);
  const responseData = await res.json();
  if (!res.ok) {
    throw Error(responseData.error || "error in login");
  }
  return responseData;
}

export async function getMeService(token: string) {
  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.error || "session expired");
  }
  return responseData;
}
