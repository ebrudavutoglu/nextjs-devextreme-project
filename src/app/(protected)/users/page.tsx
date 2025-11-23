"use server";
import { getUsers } from "@/actions/users";
import UsersClient from "./components/client";

const UsersPage = async () => {
  const { data } = await getUsers();

  return <UsersClient users={data} />;
};

export default UsersPage;
