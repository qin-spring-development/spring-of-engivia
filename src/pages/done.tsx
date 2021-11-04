import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";

const BroadcastDone = () => {
  const router = useRouter();
  const broadcastId = router.query.id as string;

  return (
    <BaseLayout title="放送済み">
      <BroadcastTitle broadcastId={broadcastId} />
    </BaseLayout>
  );
};

export default BroadcastDone;
