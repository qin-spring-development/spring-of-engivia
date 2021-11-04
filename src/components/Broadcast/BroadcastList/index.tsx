import type { FC } from "react";
import { BroadcastItem } from "src/components/Broadcast/BroadcastItem";
import { useBroadcasts } from "src/hooks/useBroadcasts";

export const BroadCastList: FC = () => {
  const { broadcasts, error, isLoading, isEmpty } = useBroadcasts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error.message}</div>;
  if (isEmpty) return <div>データは空です</div>;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="py-10 mx-auto text-4xl font-bold">放送一覧</h1>
      {broadcasts?.map((broadcast) => {
        return (
          <div key={broadcast.id}>
            <BroadcastItem broadcast={broadcast} />
          </div>
        );
      })}
    </div>
  );
};
