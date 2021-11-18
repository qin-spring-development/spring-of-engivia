import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Form } from "src/components/Form";
import { BroadcastFormType } from "src/types/interface";
import { createBroadcast } from "src/lib/db";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { useBroadcastId } from "src/hooks/useSharedState";

export const EngiviaCreate: FC = () => {
  const { broadcastId } = useBroadcastId();
  const [formData, setFormData] = useState({
    title: "",
    broadCastingDate: new Date().toISOString(),
  });

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, broadCastingDate: e.target.value });
  };

  const onSubmitHandler = () => {
    createBroadcast(formData);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <BroadcastTitle broadcastId={broadcastId} />
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
              type="submit"
              className="py-3 px-8 text-white bg-light-blue-600 rounded-md"
            >
              作成する
            </button>
            <button className="py-3 px-8 ml-8 text-light-blue-700 bg-light-blue-100 rounded-md">
              キャンセル
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
