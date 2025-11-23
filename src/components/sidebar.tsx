"use client";
import { deleteToken } from "@/actions/main";
import { Menu } from "devextreme-react/menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AppMenuItem {
  text: string;
  icon?: string;
  path?: string;
}

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const menuItems: AppMenuItem[] = [
    { text: "Kullanıcılar", icon: "user", path: "/users" },
    {
      text: "Çıkış Yap",
      icon: "close",
    },
  ];

  return (
    <div
      className={`h-screen bg-white shadow-xl transition-all duration-300 
      ${open ? "w-64" : "w-20"} flex flex-col`}
    >
      {/* Logo */}
      <div
        className="p-6 text-2xl font-bold text-indigo-600 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? "LOGO" : "L"}
      </div>

      <div className="flex-1 px-3">
        <Menu
          dataSource={menuItems}
          displayExpr="text"
          orientation="vertical"
          onItemClick={async (e) => {
            const item = e.itemData as AppMenuItem;
            if (e?.itemData?.icon === "close") {
              await deleteToken();
              router.push("/login");
            } else {
              router.push(item.path as string);
            }
          }}
        />
      </div>
    </div>
  );
}
