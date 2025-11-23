"use client";
import { getOrders } from "@/actions/order";
import { IOrder, IProduct } from "@/types/order";
import {
  Column,
  DataGrid,
  Editing,
  MasterDetail,
  Paging,
} from "devextreme-react/data-grid";
import { Form, Item } from "devextreme-react/form";
import notify from "devextreme/ui/notify";
import { useEffect, useState } from "react";

const OrdersClient = () => {
  const [filters, setFilters] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    username: "",
    email: "",
  });

  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const filter = {
      startDate: filters?.startDate ? filters.startDate.toISOString() : null,
      endDate: filters.endDate ? filters.endDate.toISOString() : null,
      username: filters.username ?? "",
      email: filters.email ?? "",
    };

    const res = await getOrders(filter ?? {});

    setData(res.data || []);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white shadow rounded">
        <Form
          formData={filters}
          colCount={5}
          labelLocation="top"
          onFieldDataChanged={(e) => {
            setFilters((prev) => ({
              ...prev,
              [e.dataField as string]: e.value,
            }));
          }}
        >
          <Item
            dataField="startDate"
            label={{ text: "Başlangıç Tarihi" }}
            editorType="dxDateBox"
            editorOptions={{
              type: "date",
              displayFormat: "dd.MM.yyyy",
            }}
            colSpan={2}
          />

          <Item
            dataField="endDate"
            label={{ text: "Bitiş Tarihi" }}
            editorType="dxDateBox"
            editorOptions={{
              type: "date",
              displayFormat: "dd.MM.yyyy",
            }}
          />

          <Item
            dataField="username"
            label={{ text: "Kullanıcı Adı" }}
            editorType="dxTextBox"
            editorOptions={{
              placeholder: "johnd",
            }}
          />

          <Item
            dataField="email"
            label={{ text: "E-posta" }}
            editorType="dxTextBox"
            editorOptions={{
              placeholder: "john@gmail.com",
            }}
          />

          {/* Butonlar */}
          <Item
            itemType="button"
            horizontalAlignment="left"
            buttonOptions={{
              text: "Filtrele",
              type: "default",
              onClick: loadData,
            }}
          />
        </Form>
      </div>

      {/* ⭐ DEVEXTREME DATAGRID ⭐ */}
      <DataGrid
        dataSource={data}
        showBorders={true}
        rowAlternationEnabled={true}
        height={500}
        loadPanel={{ enabled: loading }}
      >
        <Paging defaultPageSize={10} />
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          confirmDelete={true}
          allowAdding={true}
        />

        <Column dataField="id" caption="#" width={80} />
        <Column dataField="userId" caption="İsim" />
        <Column dataField="date" caption="Tarih" dataType="date" />
        <MasterDetail enabled={true} render={OrderDetail} />
      </DataGrid>
    </div>
  );
};

const OrderDetail = ({ data }: { data: { products: IProduct[] } }) => {
  const products = data?.products;

  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <h3 className="font-semibold text-lg mb-3">Ürünler</h3>

      <DataGrid
        dataSource={products}
        showBorders={true}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
      >
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          confirmDelete={true}
          allowAdding={true}
        />
        <Column dataField="productId" caption="Ürün Id" />
        <Column dataField="quantity" caption="Adet" />
      </DataGrid>
    </div>
  );
};

export default OrdersClient;
