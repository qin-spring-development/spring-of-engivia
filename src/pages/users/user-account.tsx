import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { useSession } from "next-auth/client";
import { Form } from "src/components/Form";
import { Button } from "src/components/Button";
import { resizeFile } from "src/lib/resizeFile";
import { CameraIcon } from "@heroicons/react/solid";

const UserProfile: NextPage = () => {
  const [session] = useSession();
  const [name, setName] = useState<string | undefined>(session?.user.name);
  const [previewImage, setPreviewImage] = useState(session?.user.image);
  const router = useRouter();

  const onChangeImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    // e.target.valueだとpossibly nullエラーが出るので、エラー解消参考記事
    // https://qiita.com/obr-note/items/7229be539405267fb458
    if (e.currentTarget.files !== null) {
      const image = await resizeFile(e.currentTarget.files[0]);
      setPreviewImage(image);
    }
  };

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

          <label className="inline-block relative mb-10 cursor-pointer">
            <img
              src={previewImage}
              alt="user"
              className="mr-2 h-32 rounded-full"
            />
            <CameraIcon className="absolute top-0 left-0 p-8 h-32 text-gray-500 hover:bg-gray-200 rounded-full opacity-0 hover:opacity-70 transition duration-200 ease-in-out" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              className="hidden"
              onChange={onChangeImageHandler}
            />
          </label>
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
              onClick={() => router.push("/broadcasts")}
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
