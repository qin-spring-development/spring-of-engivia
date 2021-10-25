import type { FC } from "react";
import { BroadcastType } from "src/types/interface";

interface Props {
  broadcastInfo: BroadcastType;
}

export const BroadcastTitle: FC<Props> = (props) => {
  const { status, title } = props.broadcastInfo;
  return (
    <div>
      {props.broadcastInfo?.status && (
        <div className="flex flex-col flex-wrap items-center pt-10 mb-20 w-full text-center">
          <p
            className={`inline py-1 px-3 text-sm rounded-full ${
              status === "BEFORE"
                ? "bg-[#FFEDD5] text-[#C2410C]"
                : status === "IN_FEATURE"
                ? "bg-[#D1FAE5] text-[#047857]"
                : "bg-gray-200"
            }`}
          >
            {status === "BEFORE"
              ? "放送前"
              : status === "IN_FEATURE"
              ? "放送中"
              : "放送済み"}
          </p>
          <h1 className="mt-4 text-3xl font-bold text-[#111827]">{title}</h1>
        </div>
      )}
    </div>
  );
};
