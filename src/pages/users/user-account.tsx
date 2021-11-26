import type { NextPage } from "next";
import { useState } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { useSession } from "next-auth/client";
import { Form } from "src/components/Form";
import { Button } from "src/components/Button";

const UserProfile: NextPage = () => {
  const [session] = useSession();
  const [name, setName] = useState<string | undefined>(session?.user.name);

  return (
    <BaseLayout title="放送一覧">
      <div className="pt-10 mx-auto max-w-2xl">
        <div className="p-10 bg-white rounded-md shadow-sm">
          <h1 className="text-3xl font-bold text-center text-gray-700">
            アカウント編集
          </h1>
          <h2 className="mt-10 mb-2 font-bold text-gray-700">ユーザー名</h2>
          <Form
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ユーザー名を入力する"
          />
          <h2 className="mt-10 mb-2 font-bold text-gray-700">
            プロフィール写真
          </h2>
          <div className="flex items-end mb-10">
            <img
              className="mr-5 h-36 rounded-md"
              src={session?.user.image}
              alt="avatar"
            />
            <Button
              type="button"
              isSubmitting={false}
              isPrimary={false}
              className="text-black bg-gray-200"
              onClick={() => console.log("保存")}
            >
              アップロードする
            </Button>
          </div>
          <hr />
          <div className="flex flex-row-reverse content-end mt-5">
            <Button
              type="button"
              isSubmitting={false}
              isPrimary={true}
              onClick={() => console.log("保存")}
            >
              保存する
            </Button>
            <Button
              type="button"
              isSubmitting={false}
              isPrimary={false}
              onClick={() => console.log("キャンセル")}
            >
              キャンセル
            </Button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default UserProfile;
