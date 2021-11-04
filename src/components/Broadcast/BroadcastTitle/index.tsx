import type { FC } from "react";
import { useBroadcasts } from "src/hooks/useBroadcasts";

interface Props {
  broadcastId: string;
}

export const BroadcastTitle: FC<Props> = ({ broadcastId }) => {
  const { broadcasts, error, isLoading, isEmpty } = useBroadcasts();

  const broadcast = broadcasts?.find(
    (broadcast) => broadcast.id === broadcastId
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error.message}</div>;
  if (isEmpty) return <div>データは空です</div>;

  return (
    <div>
      {broadcast?.status && (
        <div className="flex flex-col flex-wrap items-center pt-10 mb-20 w-full text-center">
          <p
            className={`inline py-1 px-3 text-sm rounded-full ${
              broadcast.status === "BEFORE"
                ? "bg-[#FFEDD5] text-[#C2410C]"
                : broadcast.status === "IN_FEATURE"
                ? "bg-[#D1FAE5] text-[#047857]"
                : "bg-gray-200"
            }`}
          >
            {broadcast.status === "BEFORE"
              ? "放送前"
              : broadcast.status === "IN_FEATURE"
              ? "放送中"
              : "放送済み"}
          </p>
          <h1 className="mt-4 text-3xl font-bold text-[#111827]">
            {broadcast.title}
          </h1>
        </div>
      )}
    </div>
  );
};
