import type { FC } from "react";
import { BroadcastType } from "src/types/interface";
import { Label } from "src/components/Label";

type Props = {
  broadcast: BroadcastType;
};

export const BroadcastTitle: FC<Props> = ({ broadcast }) => {
  return (
    <div className="flex flex-col items-center pt-10">
      <Label status={broadcast.status} />
      <h1 className="my-4 text-3xl font-bold text-[#111827]">
        {broadcast.title}
      </h1>
    </div>
  );
};
