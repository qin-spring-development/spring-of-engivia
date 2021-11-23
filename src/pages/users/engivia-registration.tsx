import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { deleteEngivia } from "src/lib/db";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { Button } from "src/components/Button";
import { EngiviaCard } from "src/components/Engivia/EngiviaCard";
import { EngiviaInput } from "src/components/Engivia/EngiviaInput";
import {
  useSubscribeBroadcast,
  useSubscribeUserEngivia,
} from "src/hooks/useSubscribe";
import { useUser } from "src/hooks/useSharedState";

const EngiviaRegistration: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const broadcast = useSubscribeBroadcast(broadcastId);
  const userEngivia = useSubscribeUserEngivia(broadcastId, user.uid);
  const [confirm, setConfirm] = useState<boolean>(true);

  useEffect(() => {
    if (broadcast?.status === "IN_PROGRESS") {
      router.push(`/users/broadcasting?id=${broadcastId}`);
    }
    if (user.isAdmin) {
      router.push(`/admin/broadcasting?id=${broadcastId}`);
    }
  }, [broadcast?.status, broadcastId, router, user]);

  const handleDeleteEngivia = () => {
    deleteEngivia(broadcastId, userEngivia.id);
    alert("削除しました");
    router.push("/broadcasts");
  };
  const handleEditEngivia = () => {
    setConfirm(false);
  };

  return (
    <BaseLayout title="放送一覧">
      <div className="flex relative justify-center items-center">
        <BroadcastTitle broadcast={broadcast} />
      </div>

      {userEngivia.id !== "" && confirm ? (
        <div>
          <EngiviaCard engivia={userEngivia} />
          <div className="flex justify-center">
            <Button
              isSubmitting={false}
              type="button"
              isPrimary={true}
              onClick={handleEditEngivia}
            >
              編集する
            </Button>
            <Button
              isSubmitting={false}
              type="button"
              isPrimary={false}
              onClick={handleDeleteEngivia}
            >
              削除する
            </Button>
          </div>
        </div>
      ) : (
        <EngiviaInput
          userEngivia={userEngivia}
          broadcastId={broadcastId}
          setConfirm={setConfirm}
        />
      )}
    </BaseLayout>
  );
};

export default EngiviaRegistration;
