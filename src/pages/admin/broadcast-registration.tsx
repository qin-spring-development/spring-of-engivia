import type { ChangeEvent } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { Form } from "src/components/Form";
import { Button } from "src/components/Button";
import { BroadcastFormType, BroadcastType } from "src/types/interface";
import { createBroadcast, updateBroadcast, deleteBroadcast } from "src/lib/db";
import { getBroadcast } from "src/lib/db-admin";
import { initialBroadcastInfo } from "src/constant/initialState";

type Props = {
  broadcast: BroadcastType;
};

const Registration: NextPage<Props> = ({ broadcast }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<BroadcastFormType>({
    title: broadcast.title,
    broadCastingDate: format(
      parseISO(broadcast.broadCastingDate),
      "yyyy-MM-dd"
    ),
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    setFormData({ ...formData, [id]: e.target.value });
  };

  const handleOnSubmit = () => {
    if (broadcast.id === "") {
      createBroadcast(formData);
    } else {
      updateBroadcast(formData, broadcast.id);
    }
    router.push("/broadcasts");
  };

  const handleOnDelete = () => {
    deleteBroadcast(broadcast.id);
    router.push("/broadcasts");
  };

  return (
    <BaseLayout title="放送一覧">
      <div className="mx-auto max-w-3xl">
        <h1 className="py-10 mx-auto text-4xl font-bold text-gray-900">
          {broadcast.id === "" ? " 放送を作成" : "放送を編集"}
        </h1>
        <form>
          <div className="flex flex-col gap-10 w-full">
            <Form
              id="title"
              type="text"
              value={formData.title}
              placeholder="タイトルを入力する"
              onChange={handleOnChange}
            />
            <Form
              id="broadCastingDate"
              type="date"
              value={format(parseISO(formData.broadCastingDate), "yyyy-MM-dd")}
              placeholder="2021/09/03"
              onChange={handleOnChange}
            />

            <div className="space-x-4 w-full text-center">
              <Button
                isSubmitting={false}
                isPrimary={true}
                type="button"
                onClick={handleOnSubmit}
              >
                保存する
              </Button>
              <Button
                isSubmitting={false}
                isPrimary={false}
                type="button"
                onClick={() => router.push("/broadcasts")}
              >
                キャンセル
              </Button>
              {broadcast.id !== "" && (
                <Button
                  isSubmitting={false}
                  isPrimary={false}
                  type="button"
                  onClick={handleOnDelete}
                >
                  削除する
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Registration;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.id) {
    const broadcast = await getBroadcast(context.query.id as string);
    return { props: { broadcast } };
  } else return { props: { broadcast: initialBroadcastInfo } };
};
