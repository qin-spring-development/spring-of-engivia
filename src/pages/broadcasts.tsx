import { NextPage } from "next";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastList } from "src/components/Broadcast/BroadcastList";
import { useSubscribeBroadcasts } from "src/hooks/useSubscribe";

const Broadcasts: NextPage = () => {
  const broadcasts = useSubscribeBroadcasts();

  return (
    <BaseLayout title="放送一覧">
      <BroadcastList broadcasts={broadcasts} />
    </BaseLayout>
  );
};

export default Broadcasts;
