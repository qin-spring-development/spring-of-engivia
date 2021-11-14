import { NextPage } from "next";
import { useEffect } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadCastList } from "src/components/Broadcast/BroadcastList";
import { BroadcastState } from "src/components/Broadcast/BroadcastState";
import {
  useBroadcastId,
  useUserEngivia,
  useEngivias,
} from "src/hooks/useSharedState";
// import { useBroadcasts } from "src/hooks/useSWR/useBroadcasts";
import { useSubscribeBroadcasts } from "src/hooks/useSubscribe";

const Broadcasts: NextPage = () => {
  const { broadcastId, setBroadcastId } = useBroadcastId();
  const { setUserEngivia } = useUserEngivia();
  const { setEngivias } = useEngivias();
  const broadcasts = useSubscribeBroadcasts();

  // const { broadcasts, isLoading, error } = useBroadcasts();

  useEffect(() => {
    setBroadcastId("");
    setUserEngivia(null);
    setEngivias(null);
  }, []);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  return (
    <BaseLayout title="放送一覧">
      {broadcastId === "" ? (
        <BroadCastList broadcasts={broadcasts} />
      ) : (
        <BroadcastState />
      )}
    </BaseLayout>
  );
};

export default Broadcasts;
