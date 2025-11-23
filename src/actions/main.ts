"use server";
import { cookies } from "next/headers";

export async function isAuthenticated(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie") || "";
  return cookieHeader.includes("accessToken=");
}

export const getHeaders = async () => {
  const token = await getToken();
  /* const tenant = await getTenant(); */

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
};

export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return token;
};

export const setToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token, { secure: false });
};

export const deleteToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
};
