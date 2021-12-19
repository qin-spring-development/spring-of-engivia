import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { InputFiled } from "src/components/Form/InputFiled";
import { Button } from "src/components/Button";
import toast from "react-hot-toast";
import schemas from "src/lib/yupSchema/engiviaSchema";
import { signIn, signOut, useSession } from "next-auth/client";
import { deleteUser, updateUsername } from "src/lib/users";
import { auth } from "src/lib/firebase";

type UserNameForm = {
  username: string;
};

const UserAccount: NextPage = () => {
  const [session] = useSession();
  const router = useRouter();
  const [name] = useState<string>(session?.user.name as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserNameForm>({
    resolver: yupResolver(schemas().pick(["username"])),
  });

  const handleSave: SubmitHandler<UserNameForm> = useCallback(
    async (data) => {
      if (session?.user) {
        await updateUsername(session.user.id, data.username);
        signIn("credentials", {
          id: session.user.id,
          email: session.user.email,
        });
        toast("保存しました", {
          duration: 4000,
          position: "top-center",
          className: "",
          icon: "👏",
        });
      }
    },
    [session?.user]
  );

  const handleDelete = useCallback(async () => {
    if (session?.user) {
      await deleteUser(session.user.id);
      toast("退会しました", {
        duration: 4000,
        position: "top-center",
        className: "",
        icon: "🙇‍♂️",
      });
      auth.signOut();
      signOut({ callbackUrl: "/" });
    }
  }, [session?.user]);

  return (
    <BaseLayout title="放送一覧">
      <div className="pt-10 mx-auto max-w-2xl">
        <div className="p-10 bg-white rounded-md shadow-sm">
          <h1 className="text-3xl font-bold text-center text-gray-700">
            アカウント編集
          </h1>
          <h2 className="mt-10 mb-2 font-bold text-gray-700">ユーザー名</h2>
          <form onSubmit={handleSubmit(handleSave)}>
            <InputFiled
              id="username"
              type="text"
              value={name}
              placeholder="ユーザー名を入力する"
              register={register("username")}
            />
            {errors.username?.message && (
              <span className="text-base text-red-500">
                {errors.username?.message}
              </span>
            )}
            <div className="flex flex-row-reverse justify-between content-end mt-5">
              <div>
                <Button
                  type="button"
                  isPrimary={false}
                  onClick={() => router.push("/broadcasts")}
                >
                  キャンセル
                </Button>
                <Button type="submit" isPrimary>
                  保存する
                </Button>
              </div>
              <div>
                <Button type="button" isPrimary={false} onClick={handleDelete}>
                  退会する
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};

export default UserAccount;
