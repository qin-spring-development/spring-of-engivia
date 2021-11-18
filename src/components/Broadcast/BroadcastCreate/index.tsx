import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Form } from "src/components/Form";
import { BroadcastFormType } from "src/types/interface";
import { createBroadcast } from "src/lib/db";

export const BroadcastCreate: FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    broadCastingDate: new Date().toISOString(),
  });

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    setFormData({ ...formData, [id]: e.target.value });
  };

  const onSubmitHandler = () => {
    createBroadcast(formData);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="py-10 mx-auto text-4xl font-bold text-gray-900">
        放送を作成
      </h1>
      <form onSubmit={onSubmitHandler}>
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
              type="submit"
              className="py-3 px-8 text-white bg-light-blue-600 rounded-md"
            >
              作成する
            </button>
            <button
              type="button"
              className="py-3 px-8 ml-8 text-light-blue-700 bg-light-blue-100 rounded-md"
            >
              キャンセル
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
