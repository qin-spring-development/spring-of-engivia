import type { ChangeEvent } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { Form } from "src/components/Form";
import { BroadcastFormType } from "src/types/interface";
import { createBroadcast } from "src/lib/db";

const Registration: NextPage = () => {
  const [formData, setFormData] = useState<BroadcastFormType>({
    title: "",
    broadCastingDate: new Date().toISOString(),
  });
  const router = useRouter();

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const onSubmitHandler = () => {
    createBroadcast(formData);
    router.push("/broadcasts");
  };

  return (
    <BaseLayout title="放送一覧">
      <div className="mx-auto max-w-3xl">
        <h1 className="py-10 mx-auto text-4xl font-bold text-gray-900">
          放送を作成
        </h1>
        <form>
          <div className="flex flex-col gap-10 w-full">
            <Form
              id="title"
              type="text"
              value={formData.title}
              placeholder="タイトルを入力する"
              onChange={onChangeInputHandler}
            />
            <Form
              id="date"
              type="date"
              value={format(parseISO(formData.broadCastingDate), "yyyy-MM-dd")}
              placeholder="2021/09/03"
              onChange={onChangeInputHandler}
            />
            <div className="space-x-4 w-full text-center">
              <button
                type="button"
                onClick={onSubmitHandler}
                className="py-3 px-8 text-white bg-light-blue-600 rounded-md"
              >
                作成する
              </button>
              <button
                type="button"
                onClick={() => router.push("/broadcasts")}
                className="py-3 px-8 ml-8 text-light-blue-700 bg-light-blue-100 rounded-md"
              >
                キャンセル
              </button>
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Registration;
