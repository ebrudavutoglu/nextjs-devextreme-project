"use server";
import { IOrder } from "@/types/order";
import { getToken } from "./main";
import { fetcher } from "@/lib/api";

export const getOrders = async (
  searchParams: Record<
    string,
    string | number | null | boolean | Date | undefined
  >
): Promise<{
  status: boolean;
  data: IOrder[] | null;
}> => {
  const token = await getToken();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const queryString = new URLSearchParams(
    Object.entries(searchParams || {}).reduce((acc, [key, value]) => {
      acc[key] = String(value ?? "");
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const response = await fetcher<IOrder[]>(
    `/carts?${queryString}`,
    requestOptions
  );

  return {
    status: response.status,
    data: response.data as IOrder[],
  };
};
