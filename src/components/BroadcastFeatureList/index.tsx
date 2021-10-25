import type { FC } from "react";
import { BroadcastFeatureItem } from "src/components/BroadcastFeatureItem";
import { EngiviaType } from "src/types/interface";

type Props = {
  engivias: EngiviaType[];
  broadcastId: string;
};

export const BroadcastFeatureList: FC<Props> = ({ engivias, broadcastId }) => {
  return (
    <div>
      {engivias.map((engivia) => (
        <div key={engivia.id}>
          <BroadcastFeatureItem engivia={engivia} broadcastId={broadcastId} />
        </div>
      ))}
    </div>
  );
};
