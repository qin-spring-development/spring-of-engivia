import { ChangeEvent } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { mutate } from "swr";
import { Form } from "src/components/Form";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastFormType, BroadcastType } from "src/types/interface";
import { REQUIRE_MSG } from "src/constant/validationMessage";
import { updateBroadcast } from "src/lib/db";
import { useBroadcast } from "src/hooks/useBroadcast";

const CreateBroadcast = () => {
  // Todo: React Hooks Form を導入次第変更
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const { broadcast, error, isLoading } = useBroadcast(broadcastId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
  };

  const onSubmitHandler: SubmitHandler<BroadcastFormType> = (formData) => {
    mutate(
      `/api/broadcast/${broadcastId}`,
      async (data: any) => {
        return {
          broadcast: {
            ...data.broadcast,
            title: formData.title,
            broadCastingDate: new Date(formData.date).toISOString(),
          },
        };
      },
      false
    );
    updateBroadcast(formData, broadcastId);
    mutate(`/api/broadcast/${broadcastId}`);
    router.push("/broadcasts");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error.message}</div>;

  return (
    <BaseLayout title="放送を編集">
      <div className="mx-auto max-w-3xl">
        <h1 className="py-10 mx-auto text-4xl font-bold text-gray-900">
          放送を編集
        </h1>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Todo: validationのパターンを検討 */}
          <div className="flex flex-col gap-10 w-full">
            <Form
              id="title"
              type="text"
              value={broadcast.title}
              placeholder="タイトルを入力する"
              register={register("title", { required: REQUIRE_MSG })}
              isInvalid={errors?.title}
              onChange={onChangeInputHandler}
            />
            {/* Todo: dateにするなら手入力も出来たほうがいい */}
            <Form
              id="date"
              type="date"
              value={format(parseISO(broadcast.broadCastingDate), "yyyy-MM-dd")}
              placeholder="2021/09/03"
              register={register("date", { required: REQUIRE_MSG })}
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
            <p>{broadcast.title}</p>
            <p>{broadcast.broadCastingDate}</p>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default CreateBroadcast;
