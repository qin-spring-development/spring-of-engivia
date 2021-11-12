import { NextPage } from "next";
import { useEffect } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadCastList } from "src/components/Broadcast/BroadcastList";
import { BroadcastBefore } from "src/components/Broadcast/BroadcastBefore";
import { useBroadcastId } from "src/hooks/useSharedState";
// import { useBroadcasts } from "src/hooks/useSWR/useBroadcasts";
import { useSubscribeBroadcasts } from "src/hooks/useSubscribe";

const Broadcasts: NextPage = () => {
  const { broadcastId, setBroadcastId } = useBroadcastId();
  const broadcasts = useSubscribeBroadcasts();

  // const { broadcasts, isLoading, error } = useBroadcasts();

  useEffect(() => {
    setBroadcastId("");
  }, []);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

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
