import type { FC } from "react";
import { useState, useEffect } from "react";
import { db } from "src/lib/firebase";
import { EngiviaType, BroadcastType } from "src/types/interface";
import { initialBroadcastInfo } from "src/const/initialState";
import { BroadcastFeatureItem } from "src/components/BroadcastFeatureItem";
import { BroadcastTitle } from "src/components/BroadcastTitle";

type Props = {
  engivias: EngiviaType[];
  broadcastId: string;
};

export const BroadcastFeatureList: FC<Props> = ({ engivias, broadcastId }) => {
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
    <div className="mx-auto max-w-2xl">
      <BroadcastTitle broadcastInfo={broadcastInfo} />
      {engivias.map((engivia, index) => (
        <div key={engivia.id}>
          <BroadcastFeatureItem
            engivia={engivia}
            broadcastId={broadcastId}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};
