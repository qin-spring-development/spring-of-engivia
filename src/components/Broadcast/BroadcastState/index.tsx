import type { FC } from "react";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { EngiviaInput } from "src/components/Engivia/EngiviaInput";
import { EngiviaConfirm } from "src/components/Engivia/EngiviaConfirm";
import { Broadcasting } from "src/components/Broadcast/Broadcasting";
import { Broadcasted } from "src/components/Broadcast/Broadcasted";
import {
  useSubscribeUserEngivia,
  useSubscribeBroadcast,
} from "src/hooks/useSubscribe";
import { useBroadcastId, useUser } from "src/hooks/useSharedState";

export const BroadcastState: FC = () => {
  const { user } = useUser();
  const { broadcastId } = useBroadcastId();
  const broadcast = useSubscribeBroadcast(broadcastId);
  const userEngivia = useSubscribeUserEngivia(broadcastId, user.uid);

  return (
    <div>
      <BroadcastTitle broadcastId={broadcastId} />
      {broadcast?.status === "DONE" ? (
        <Broadcasted />
      ) : broadcast?.status === "IN_PROGRESS" ? (
        <Broadcasting />
      ) : userEngivia ? (
        <EngiviaConfirm />
      ) : (
        <EngiviaInput />
      )}
    </div>
  );
};
