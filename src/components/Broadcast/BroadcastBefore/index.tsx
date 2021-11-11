import type { FC } from "react";
import { BroadcastTitle } from "src/components/Broadcast/BroadcastTitle";
import { EngiviaInput } from "src/components/Engivia/EngiviaInput";
import { EngiviaConfirm } from "src/components/Engivia/EngiviaConfirm";
import { useSubscribeUserEngivia } from "src/hooks/useSubscribe";
import { useBroadcastId } from "src/hooks/useSharedState";

export const BroadcastBefore: FC = () => {
  const userId = "0VdnReeUhHOkonTR3EFmRb3UO4v1";
  const { broadcastId } = useBroadcastId();
  const engivia = useSubscribeUserEngivia(broadcastId, userId);

  return (
    <div>
      <BroadcastTitle />
      {engivia ? <EngiviaConfirm engivia={engivia} /> : <EngiviaInput />}
    </div>
  );
};
