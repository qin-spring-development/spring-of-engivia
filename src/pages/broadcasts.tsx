import { NextPage } from "next";
import { useEffect } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadCastList } from "src/components/Broadcast/BroadcastList";
import { BroadcastBefore } from "src/components/Broadcast/BroadcastBefore";
import { useBroadcastId, useEngivia } from "src/hooks/useSharedState";
import { useSubscribeBroadcasts } from "src/hooks/useSubscribe";

const Broadcasts: NextPage = () => {
  const { broadcastId, setBroadcastId } = useBroadcastId();
  const broadcasts = useSubscribeBroadcasts();
  const { engivia } = useEngivia();

  useEffect(() => {
    setBroadcastId("");
    console.log({ engivia });
  }, []);

  return (
    <BaseLayout title="放送一覧">
      {broadcastId === "" ? (
        <BroadCastList broadcasts={broadcasts} />
      ) : (
        <BroadcastBefore />
      )}
    </BaseLayout>
  );
};

export default Broadcasts;
