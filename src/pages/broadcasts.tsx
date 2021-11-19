import { NextPage } from "next";
import { useEffect } from "react";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastList } from "src/components/Broadcast/BroadcastList";
import { useEngivias } from "src/hooks/useSharedState";
import { useSubscribeBroadcasts } from "src/hooks/useSubscribe";

const Broadcasts: NextPage = () => {
  const { setEngivias } = useEngivias();
  const broadcasts = useSubscribeBroadcasts();

  useEffect(() => {
    setEngivias(null);
  }, []);

  return (
    <BaseLayout title="放送一覧">
      <BroadcastList broadcasts={broadcasts} />
      {/* <BroadcastState /> */}
    </BaseLayout>
  );
};

export default Broadcasts;
