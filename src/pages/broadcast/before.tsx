import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "src/lib/firebase";
import { BroadcastType } from "src/types/interface";
import { initialBroadcastInfo } from "src/constant/initialState";
import { BaseLayout } from "src/components/Layouts/BaseLayout";
import { BroadcastTitle } from "src/components/BroadcastTitle";

const BroadcastBefore = () => {
  const router = useRouter();
  const broadcastId = router.query.id as string;
  const [broadcastInfo, setBroadcastInfo] =
    useState<BroadcastType>(initialBroadcastInfo);

  useEffect(() => {
    const getBroadcastInfo = async () => {
      const broadcastRef = await db
        .collection("broadcasts")
        .doc(broadcastId)
        .get();
      setBroadcastInfo(broadcastRef.data() as BroadcastType);
    };
    getBroadcastInfo();
  }, [broadcastId]);

  return (
    <BaseLayout title="放送前">
      <BroadcastTitle broadcastInfo={broadcastInfo} />
    </BaseLayout>
  );
};

export default BroadcastBefore;
