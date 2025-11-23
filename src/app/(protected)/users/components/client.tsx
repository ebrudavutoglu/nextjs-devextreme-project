"use client";
import { deleteUser } from "@/actions/users";
import { IUser } from "@/types/user";
import { Column, DataGrid, Button } from "devextreme-react/data-grid";
import notify from "devextreme/ui/notify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Popup from "devextreme-react/popup";
import { ColumnButtonClickEvent } from "devextreme/ui/data_grid";

const UsersClient = ({ users }: { users: IUser[] | null }) => {
  const router = useRouter();
  const [initialUsers, setInitialUsers] = useState(
    users?.map((u) => ({
      id: u.id,
      name: `${u.name.firstname} ${u.name?.lastname}`,
      email: u.email,
      username: u.username,
    })) ?? []
  );
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const confirmDelete = (rowData: IUser) => {
    setSelectedUser(rowData);
    setPopupVisible(true);
  };

  const handleDelete = async () => {
    const res = await deleteUser(selectedUser?.id as number);
    if (res.status) {
      notify(`"${selectedUser?.name}" silindi`, "success", 1000);
      setInitialUsers((prev) => prev.filter((u) => u.id !== selectedUser?.id));
    } else {
      notify(`"${selectedUser?.name}" Bir Hata oluştu`, "error", 1000);
    }
    setPopupVisible(false);
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setPopupVisible(false);
    setSelectedUser(null);
  };

  const handleEdit = (id: IUser["id"]) => {
    router.push(`/users/${id}`);
  };

  return (
    <div>
      <div className="flex justify-end py-2">
        <Link href="/users/create" className="bg-blue-800 px-4 py-2 rounded-md">
          Kullanıcı Oluştur
        </Link>
      </div>
      <DataGrid
        dataSource={initialUsers}
        showBorders={true}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
        height={380}
      >
        <Column dataField="id" caption="#" width={60} allowEditing={false} />
        <Column dataField="name" caption="Ad" />
        <Column dataField="username" caption="Kullanıcı Adı" />
        <Column dataField="email" caption="E-Posta" />
        <Column type="buttons" caption="İşlemler" width={150}>
          <Button
            text="Düzenle"
            icon="edit"
            cssClass="dx-btn--edit"
            onClick={(e: ColumnButtonClickEvent) =>
              handleEdit(e?.row?.data?.id)
            }
          />
          <Button
            text="Sil"
            icon="trash"
            cssClass="dx-btn--delete"
            onClick={(e: ColumnButtonClickEvent) => confirmDelete(e?.row?.data)}
          />
        </Column>
      </DataGrid>
      <Popup
        visible={popupVisible}
        onHiding={handleCancel}
        showTitle={true}
        title="Silme Onayı"
        dragEnabled={false}
        closeOnOutsideClick={true}
        width={300}
        height={150}
      >
        <div>
          <p>Bu kullanıcıyı silmek istediğinize emin misiniz?</p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button
              onClick={handleCancel}
              className="px-4 py-1 bg-red-600 text-white rounded-md"
            >
              İptal
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-1 bg-blue-600 text-white rounded-md"
            >
              Sil
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default UsersClient;
