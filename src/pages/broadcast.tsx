import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { useBroadcast } from "src/hooks/useBroadcast";
import { getEngivia, updateBroadcastFeatureId } from "src/lib/db";

const Broadcast: NextPage = () => {
  const [engivia, setEngivia] = useState();
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const engiviaId = "bIkNUUgfYGEx203nq1dw";
  const { broadcast, error, isLoading, mutate } = useBroadcast(broadcastId);

  const onDisplay = async () => {
    updateBroadcastFeatureId(broadcastId, engiviaId, true);
    const oneEngivia = await getEngivia(broadcastId, engiviaId);
    console.log({ oneEngivia });
    mutate(`/api/broadcast/${broadcastId}`);
  };

  const onSetNull = () => {
    updateBroadcastFeatureId(broadcastId, engiviaId, false);
    mutate(`/api/broadcast/${broadcastId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error.message}</div>;

  return (
    <BaseLayout title="放送中">
      <BroadcastTitle broadcastId={broadcastId} />
      {broadcast?.featureId === null ? (
        <h1>次のエンジビアをお待ちください</h1>
      ) : (
        <h1>{broadcast.id}</h1>
      )}
      <div>
        <button
          onClick={onDisplay}
          className="py-2 px-4 mr-2 text-white bg-red-500 rounded-lg"
        >
          エンジビア表示
        </button>
        <button
          onClick={onSetNull}
          className="py-2 px-4 text-white bg-green-500 rounded-lg"
        >
          null
        </button>
      </div>
    </BaseLayout>
  );
};

export default Broadcast;
