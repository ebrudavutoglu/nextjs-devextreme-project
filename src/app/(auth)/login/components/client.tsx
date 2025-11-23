"use client";
import { useCallback, useRef, useState } from "react";
import Form, {
  ButtonItem,
  SimpleItem,
  RequiredRule,
  FormRef,
} from "devextreme-react/form";
import { ButtonType } from "devextreme-react/common";
import notify from "devextreme/ui/notify";
import "devextreme-react/autocomplete";
import "devextreme-react/date-range-box";
import { login } from "@/actions/auth";
import { setToken } from "@/actions/main";
import { useRouter } from "next/navigation";

const usernameEditorOptions = {
  valueChangeEvent: "keyup",
};

function LoginClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "mor_2314",
    password: "83r5^_",
  });
  const formRef = useRef<FormRef>(null);

  const getPasswordOptions = useCallback(
    () => ({
      mode: "password",
      valueChangeEvent: "keyup",
    }),
    []
  );

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const res = await login(formData);
      if (res.status) {
        await setToken(res.data?.token as string);
        router.push("/users");
        notify(
          {
            message: "Giriş Başarılı!",
            position: {
              my: "center top",
              at: "center top",
            },
          },
          "success",
          3000
        );
      } else {
        notify(
          {
            message: "Tekrar Deneyin",
            position: {
              my: "center top",
              at: "center top",
            },
          },
          "error",
          3000
        );
      }
    },
    [formData, router]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">
          Giriş Yap
        </h1>
        <form onSubmit={handleSubmit}>
          <Form
            ref={formRef}
            formData={formData}
            readOnly={false}
            showColonAfterLabel={true}
            showValidationSummary={true}
            validationGroup="formData"
            onFieldDataChanged={(e) => {
              setFormData((prev) => ({
                ...prev,
                [e.dataField as string]: e.value,
              }));
            }}
          >
            <SimpleItem
              name="username"
              dataField="username"
              label={{ text: "Kullanıcı Adı" }}
              editorType="dxTextBox"
              editorOptions={usernameEditorOptions}
            >
              <RequiredRule message="Kullanıcı Adı zorunludur" />
            </SimpleItem>
            <SimpleItem
              name="password"
              dataField="password"
              label={{ text: "Şifre" }}
              editorType="dxTextBox"
              editorOptions={getPasswordOptions()}
            >
              <RequiredRule message="Şifre zorunludur" />
            </SimpleItem>
            <ButtonItem
              buttonOptions={{
                text: "Giriş Yap",
                type: "default" as ButtonType,
                useSubmitBehavior: true,
                width: "120px",
              }}
            />
          </Form>
        </form>
      </div>
    </div>
  );
}

export default LoginClient;
