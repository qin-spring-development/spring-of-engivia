import { NextPage } from "next";
import { useEffect } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastList } from "src/components/Broadcast/BroadcastList";
import { BroadcastState } from "src/components/Broadcast/BroadcastState";
import {
  useBroadcastId,
  useUserEngivia,
  useEngivias,
} from "src/hooks/useSharedState";
import { useSubscribeBroadcasts } from "src/hooks/useSubscribe";

const Broadcasts: NextPage = () => {
  const { broadcastId, setBroadcastId } = useBroadcastId();
  const { setUserEngivia } = useUserEngivia();
  const { setEngivias } = useEngivias();
  const broadcasts = useSubscribeBroadcasts();

  useEffect(() => {
    setBroadcastId("");
    setUserEngivia(null);
    setEngivias(null);
  }, []);

  return (
    <BaseLayout title="放送一覧">
      {broadcastId === "" ? (
        <BroadcastList broadcasts={broadcasts} />
      ) : (
        <BroadcastState />
      )}
    </BaseLayout>
  );
};

export default Broadcasts;
