import { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { useSubscribeBroadcasts } from "src/hooks/useSubscribe";
import { BroadcastItem } from "src/components/Broadcast/BroadcastItem";
import { Button } from "src/components/Button";
import { useSession } from "next-auth/client";

const Broadcasts: NextPage = () => {
  const [session] = useSession();
  const user = session?.user;
  const router = useRouter();
  const broadcasts = useSubscribeBroadcasts();

  const handleRegistration = () => {
    router.push("/admin/broadcast-registration");
  };

  return (
    <BaseLayout title="放送一覧">
      <div className="mx-auto max-w-3xl">
        <div className="flex justify-between items-center">
          <h1 className="py-10 text-4xl font-bold">放送一覧</h1>
          {user?.isAdmin && (
            <Button
              isSubmitting={false}
              isPrimary={true}
              type="button"
              onClick={handleRegistration}
            >
              放送を作成する
            </Button>
          )}
        </div>
        {broadcasts.map((broadcast, index) => (
          <div key={index}>
            <BroadcastItem broadcast={broadcast} />
          </div>
        ))}
        <div className="mt-5 text-center">
          <Button
            type="button"
            isSubmitting={false}
            isPrimary={false}
            onClick={() => console.log("次へ")}
          >
            戻る
          </Button>
          <Button
            type="button"
            isSubmitting={false}
            isPrimary={false}
            onClick={() => console.log("次へ")}
          >
            次へ
          </Button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Broadcasts;
