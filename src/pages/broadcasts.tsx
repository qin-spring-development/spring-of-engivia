import { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { useSubscribeBroadcasts } from "src/hooks/useSubscribe";
import { BroadcastItem } from "src/components/Broadcast/BroadcastItem";
import { Button } from "src/components/Button";
import { useSession } from "next-auth/client";

const Broadcasts: NextPage = () => {
  const [session] = useSession();
  const router = useRouter();
  const broadcasts = useSubscribeBroadcasts();

  const handleRegistration = useCallback(() => {
    router.push("/admin/broadcast-registration");
  }, [router]);

  return (
    <BaseLayout title="放送一覧">
      <div className="mx-auto max-w-3xl">
        <div className="flex justify-between items-center">
          <h1 className="py-10 text-4xl font-bold">放送一覧</h1>
          {session?.user.isAdmin && (
            <Button
              isSubmitting={false}
              isPrimary
              type="button"
              onClick={handleRegistration}
            >
              放送を作成する
            </Button>
          )}
        </div>
        <div className="pb-10">
          {broadcasts.map((broadcast, index) => (
            <div key={index}>
              <BroadcastItem broadcast={broadcast} />
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Broadcasts;
