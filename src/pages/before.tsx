import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";

const BroadcastBefore = () => {
  const router = useRouter();
  const broadcastId = router.query.id as string;

  return (
    <BaseLayout title="放送前">
      <BroadcastTitle broadcastId={broadcastId} />
    </BaseLayout>
  );
};

export default BroadcastBefore;
