"use server";
import { ILogin } from "@/types/auth";
import { fetcher } from "@/lib/api";

export const login = async (
  data: ILogin
): Promise<{ status: boolean; data: { token: string } | null }> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetcher<{ token: string; message: string | null }>(
    "/auth/login",
    requestOptions
  );

  return {
    status: response.status,
    data: response.data as { token: string },
  };
};
