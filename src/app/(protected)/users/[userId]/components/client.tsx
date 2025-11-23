"use client";
import {
  Form,
  Item,
  RequiredRule,
  ButtonItem,
  EmailRule,
} from "devextreme-react/form";
import { IUser, IUserUpdate } from "@/types/user";
import notify from "devextreme/ui/notify";
import { useState } from "react";
import { createUser, updateUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserDetailClient = ({
  isNew,
  user,
}: {
  isNew: boolean;
  user: IUser | null;
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<IUserUpdate>({
    id: isNew ? null : (user?.id as number),
    username: isNew ? null : (user?.username as string),
    email: isNew ? null : (user?.email as string),
    password: isNew ? null : (user?.password as string),
  });

  const update = async () => {
    const res = await updateUser(Number(user?.id), formData);
    if (res.status) {
      router.push("/users");
      notify("Güncelleme başarılı", "success", 800);
    } else {
      notify(res.data, "error", 800);
    }
  };
  const create = async () => {
    const res = await createUser(formData);
    if (res.status) {
      router.push("/users");
      notify("Kullanıcı başarıyla oluşturuldu", "success", 800);
    } else {
      notify(res.data, "error", 800);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) await create();
    else await update();
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-xl">
      <div className="flex justify-between py-3">
        <h2 className="text-2xl text-black font-bold">
          {isNew ? "Kullanıcı Oluştur" : " Kullanıcı Düzenle"}
        </h2>
        <Link href="/users" className="bg-blue-500 px-4 py-2 rounded-md">
          Kullanıcı Listesi
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <Form
          formData={formData}
          onFieldDataChanged={(e) =>
            setFormData((prev) => ({
              ...prev,
              [e.dataField as string]: e.value,
            }))
          }
        >
          <Item
            dataField="username"
            label={{ text: "Kullanıcı Adı" }}
            editorType="dxTextBox"
          >
            <RequiredRule message="Kullanıcı Adı zorunludur" />
          </Item>

          <Item
            dataField="email"
            label={{ text: "E-posta" }}
            editorType="dxTextBox"
          >
            <RequiredRule message="E-posta zorunludur" />
            <EmailRule message="Geçerli E-Posta giriniz" />
          </Item>

          <Item
            dataField="password"
            label={{ text: "Şifre" }}
            editorType="dxTextBox"
          >
            <RequiredRule message="Şifre zorunludur" />
          </Item>

          <ButtonItem
            horizontalAlignment="right"
            buttonOptions={{
              text: isNew ? "Oluştur" : "  Güncelle",
              type: "default",
              useSubmitBehavior: true,
            }}
          />
        </Form>
      </form>
    </div>
  );
};

export default UserDetailClient;
