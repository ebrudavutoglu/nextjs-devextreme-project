"use server";
import UserDetailClient from "./components/client";
import { getUserById } from "@/actions/users";

type Props = {
  params: Promise<{ userId: string }>;
};

const UserDetailPage = async ({ params }: Props) => {
  const { userId } = await params;
  const isNew = (await params).userId.includes("create");
  const { data } = await getUserById(userId);

  return <UserDetailClient isNew={isNew} user={data} />;
};

export default UserDetailPage;
