"use server";
import { fetcher } from "@/lib/api";
import { IUser, IUserUpdate } from "@/types/user";
import { getToken } from "./main";

export const getUsers = async (): Promise<{
  status: boolean;
  data: IUser[] | null;
}> => {
  const token = await getToken();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetcher<IUser[]>("/users", requestOptions);

  return {
    status: response.status,
    data: response.data as IUser[],
  };
};

export const getUserById = async (
  id: string
): Promise<{
  status: boolean;
  data: IUser | null;
}> => {
  const token = await getToken();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetcher<IUser>(`/users/${id}`, requestOptions);

  return {
    status: response.status,
    data: response.data as IUser,
  };
};

export const createUser = async (
  data: IUserUpdate
): Promise<{
  status: boolean;
  data: IUser | null;
}> => {
  const token = await getToken();
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetcher<IUser>(`/users`, requestOptions);
  return {
    status: response.status,
    data: response.data as IUser,
  };
};

export const updateUser = async (
  id: number,
  data: IUserUpdate
): Promise<{
  status: boolean;
  data: IUser | null;
}> => {
  const token = await getToken();
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetcher<IUser>(`/users/${id}`, requestOptions);
  return {
    status: response.status,
    data: response.data as IUser,
  };
};

export const deleteUser = async (
  id: number
): Promise<{
  status: boolean;
  data: IUser | null;
}> => {
  const token = await getToken();
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  };
  const response = await fetcher<IUser>(`/users/${id}`, requestOptions);
  return {
    status: response.status,
    data: response.data as IUser,
  };
};
