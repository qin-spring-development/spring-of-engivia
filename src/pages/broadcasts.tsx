import { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { useSubscribeBroadcasts } from "src/hooks/useSubscribe";
import { BroadcastItem } from "src/components/Broadcast/BroadcastItem";
import { useUser } from "src/hooks/useSharedState";
import { Button } from "src/components/Button";

const Broadcasts: NextPage = () => {
  const { user } = useUser();
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
          {user.isAdmin && (
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
      </div>
    </BaseLayout>
  );
};

export default Broadcasts;
