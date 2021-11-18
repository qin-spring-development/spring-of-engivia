import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import { Form } from "src/components/Form";
import { BroadcastFormType } from "src/types/interface";
import { updateBroadcast } from "src/lib/db";
import { useIsBroadcastEditScreen } from "src/hooks/useSharedState";
import { useBroadcast } from "src/hooks/useSharedState";

export const BroadcastEdit: FC = () => {
  const [formData, setFormData] = useState<BroadcastFormType>({
    title: "",
    broadCastingDate: new Date().toISOString(),
  });
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const { setIsBroadcastEditScreen } = useIsBroadcastEditScreen();
  const { broadcast } = useBroadcast();

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
  };

  const onSubmitHandler = () => {
    updateBroadcast(formData, broadcastId);
    setIsBroadcastEditScreen(false);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="py-10 mx-auto text-4xl font-bold text-gray-900">
        放送を編集
      </h1>
      <form>
        {/* Todo: validationのパターンを検討 */}
        <div className="flex flex-col gap-10 w-full">
          <Form
            id="title"
            type="text"
            value={broadcast.title}
            placeholder="タイトルを入力する"
            onChange={onChangeInputHandler}
          />
          {/* Todo: dateにするなら手入力も出来たほうがいい */}
          <Form
            id="date"
            type="date"
            value={format(parseISO(broadcast.broadCastingDate), "yyyy-MM-dd")}
            placeholder="2021/09/03"
            onChange={onChangeInputHandler}
          />
          <div className="space-x-4 w-full text-center">
            <button
              type="submit"
              className="py-3 px-8 text-white bg-light-blue-600 rounded-md"
            >
              保存する
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
