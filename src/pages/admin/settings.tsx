import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "src/components/Form";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { Broadcast } from "src/types/interface";
import { REQUIRE_MSG } from "src/constant/validationMessage";

const Settings = () => {
  // Todo: React Hooks Form を導入次第変更
  const [input, setInput] = useState({
    title: "",
    date: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmitHandler: SubmitHandler<Broadcast> = (data) => {
    console.log(data);
  };

  return (
    <BaseLayout title="放送を作成">
      <div className="mx-auto max-w-3xl">
        <h1 className="py-10 mx-auto text-4xl font-bold text-gray-900">
          放送を作成
        </h1>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Todo: validationのパターンを検討 */}
          <div className="flex flex-col gap-10 w-full">
            <Form
              id="title"
              type="text"
              value={input.title}
              placeholder="タイトルを入力する"
              register={register("title", { required: REQUIRE_MSG })}
              isInvalid={errors?.title}
              onChange={onChangeInputHandler}
            />
            {/* Todo: dateにするなら手入力も出来たほうがいい */}
            <Form
              id="broadCastingDate"
              type="date"
              value={input.date}
              placeholder="2021/09/03"
              register={register("broadCastingDate", { required: REQUIRE_MSG })}
              isInvalid={errors?.broadCastingDate}
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
    </BaseLayout>
  );
};

export default Settings;
