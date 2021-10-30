import { ChangeEvent, useState } from "react";
import { Form } from "src/components/Form";
import { BaseLayout } from "src/components/Layouts/BaseLayout";

const Setting = () => {
  // Todo: React Hooks Form を導入次第変更
  const [input, setInput] = useState({
    title: "",
    date: "",
  });

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <BaseLayout title="放送を作成">
      <div className="mx-auto max-w-3xl">
        <h1 className="py-10 mx-auto text-4xl font-bold text-gray-900">
          放送を作成
        </h1>
        <form>
          {/* Todo: validationのパターンを検討 */}
          <div className="flex flex-col gap-10 w-full">
            <Form
              type="text"
              value={input.title}
              placeholder="タイトルを入力する"
              onChange={onChangeInputHandler}
            />
            {/* Todo: dateにするなら手入力も出来たほうがいい */}
            <Form
              type="date"
              value={input.date}
              placeholder="2021/09/03"
              onChange={onChangeInputHandler}
            />
            <div className="space-x-4 w-full text-center">
              <button className="py-3 px-8 text-white bg-light-blue-600 rounded-md">
                保存する
              </button>
              <button className="py-3 px-8 ml-8 text-light-blue-700 bg-light-blue-100 rounded-md">
                キャンセル
              </button>
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Setting;
